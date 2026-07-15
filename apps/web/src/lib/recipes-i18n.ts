import type { ChainingRecipe } from "./recipes";

export const RECIPES_I18N: Record<string, ChainingRecipe[]> = {
  "en": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "How to Merge and Compress PDF Files Offline in One Go",
      "metaDescription": "Learn how to combine multiple PDF files and immediately compress the file size without download-upload loops. 100% private and offline.",
      "description": "Combining and shrinking PDF documents usually requires uploading files to separate web converters, downloading a combined file, renaming it, and uploading it again to compress. ZeroWebTools simplifies this with a connected visual pipeline. Perform both operations inside a single browser tab, with zero server uploads.",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "Step 1: Merge Your PDFs",
          "description": "Open the Merge PDF tool, upload your documents, rearrange page order visually, and click Merge.",
          "toolId": "pdf-merge"
        },
        {
          "title": "Step 2: Microchain to Compress",
          "description": "Once merged, instead of downloading, click the inline 'Compress' button to automatically pass the merged document directly to the Compressor workspace.",
          "toolId": "pdf-compress"
        },
        {
          "title": "Step 3: Choose Compression & Download",
          "description": "Select your desired compression level (Balanced, Extreme, or Lossless) and save your optimized PDF to your device."
        }
      ],
      "faqs": [
        {
          "question": "Do my files get uploaded to the server during this pipeline?",
          "answer": "No. The files are merged and compressed entirely within your browser memory using local libraries. No data is sent online."
        },
        {
          "question": "Can I also password-protect the merged file?",
          "answer": "Yes, you can continue chaining by passing the compressed output into the 'Protect PDF' tool to lock it with a password before saving."
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "How to Beautify and Base64-Encode JSON Data Securely",
      "metaDescription": "Validate, format, and encode JSON payloads to Base64 in one click. Complete local browser privacy for sensitive coder credentials.",
      "description": "Developers frequently need to format raw JSON response payloads and encode them to Base64 for query parameters or configuration scripts. ZeroWebTools connects these steps, enabling you to beautify raw JSON, validate syntax, and instantly Base64-encode the result entirely client-side.",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "Step 1: Beautify Raw JSON",
          "description": "Paste your raw or minified JSON data into the Formatter. The tool highlights keys, values, and flags any syntax errors instantly.",
          "toolId": "json-formatter"
        },
        {
          "title": "Step 2: Chain to Base64 Encoder",
          "description": "Click the 'Base64 Encode' button in the output header to instantly transfer the clean, formatted JSON straight into the Base64 encoder workspace.",
          "toolId": "base64-encoder"
        },
        {
          "title": "Step 3: Copy Encoded Output",
          "description": "The Base64 encoded string is generated instantly in the output block. Copy it to your clipboard with a single click."
        }
      ],
      "faqs": [
        {
          "question": "Is it safe to format credentials or keys?",
          "answer": "Yes. All formatting and Base64 encoding are executed locally on your machine, ensuring complete privacy for credentials, session tokens, and keys."
        },
        {
          "question": "Can I also minify the JSON before encoding it?",
          "answer": "Yes, you can toggle the 'Minify' button in the JSON Formatter workspace before passing it into the Base64 encoder."
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "How to Convert HEIC to JPG and Bulk Resize iPhone Images",
      "metaDescription": "Convert Apple HEIC photos to JPG format and resize the dimensions in batch. Fast, local browser execution with complete privacy.",
      "description": "iPhone HEIC photos are high quality but incompatible with many web portals and are often too large to share. ZeroWebTools combines conversion and resizing in a single browser workflow. Convert Apple photos to JPG and resize their width/height in batch without uploading a single pixel.",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "Step 1: Upload and Convert HEIC Photos",
          "description": "Drop your HEIC files into the converter. Select JPG or PNG output, choose quality settings, and convert.",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "Step 2: Chain to Image Resizer",
          "description": "Once converted, select 'Bulk Resize' to send the newly generated JPEGs straight into the Bulk Image Resizer workspace.",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "Step 3: Scale and Compress Dimensions",
          "description": "Set width, height, or scale percentage. Compress to your desired file weight and download the batch as a clean ZIP."
        }
      ],
      "faqs": [
        {
          "question": "Are my personal photographs uploaded to your server?",
          "answer": "No. The image decoding (HEIC) and scaling/compression are processed locally on your device's GPU/CPU. Your photos remain fully secure."
        },
        {
          "question": "Which format is best for web performance?",
          "answer": "Converting HEIC to WEBP or compressed JPG and scaling down dimensions is highly recommended for faster page loads and SEO."
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "How to Generate Secure Passwords and Calculate Hash Checksums",
      "metaDescription": "Generate cryptographically secure passwords and calculate their SHA-256 hashes locally. Secure browser utility for database setup.",
      "description": "System administrators and developers frequently need to generate random, high-entropy passwords and calculate their cryptographic hash checksums (like SHA-256 or MD5) for database credentials or user configurations. This recipe guides you through doing this instantly in your browser without network transfers.",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "Step 1: Create a Secure Password",
          "description": "Use the Password Generator to create a strong, random password. Customize length, numbers, and symbols to achieve high entropy.",
          "toolId": "password-generator"
        },
        {
          "title": "Step 2: Chain to Hash Generator",
          "description": "Select 'Calculate Hash' to instantly pass the generated password string directly into the File and String Hasher workspace.",
          "toolId": "file-hasher"
        },
        {
          "title": "Step 3: Select Algorithm & Copy Digest",
          "description": "Choose your cryptographic digest (SHA-256, SHA-512, or MD5) to generate the hash instantly. Copy the value to your clipboard."
        }
      ],
      "faqs": [
        {
          "question": "Is the password generator secure against online trackers?",
          "answer": "Yes, the generation uses the browser's native CSPRNG (Web Crypto API) locally in-memory, ensuring no key values are leaked online."
        },
        {
          "question": "Can I hash files with this tool?",
          "answer": "Yes, the File Hasher supports hashing both raw text strings (like passwords) and physical files uploaded locally."
        }
      ]
    }
  ],
  "es": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "Cómo fusionar y comprimir archivos PDF sin conexión de una sola vez",
      "metaDescription": "Aprenda a combinar varios archivos PDF y comprimir inmediatamente el tamaño del archivo sin bucles de descarga y carga. 100% privado y sin conexión.",
      "description": "Combinar y reducir documentos PDF generalmente requiere cargar archivos en convertidores web separados, descargar un archivo combinado, cambiarle el nombre y cargarlo nuevamente para comprimirlo. ZeroWebTools simplifica esto con un canal visual conectado. Realice ambas operaciones dentro de una sola pestaña del navegador, sin cargas en el servidor.",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "Paso 1: fusiona tus archivos PDF",
          "description": "Abra la herramienta Fusionar PDF, cargue sus documentos, reorganice el orden de las páginas visualmente y haga clic en Fusionar.",
          "toolId": "pdf-merge"
        },
        {
          "title": "Paso 2: Microcadena para comprimir",
          "description": "Una vez combinados, en lugar de descargarlos, haga clic en el botón \"Comprimir\" en línea para pasar automáticamente el documento combinado directamente al espacio de trabajo de Compressor.",
          "toolId": "pdf-compress"
        },
        {
          "title": "Paso 3: elija Compresión y descarga",
          "description": "Seleccione el nivel de compresión que desee (equilibrado, extremo o sin pérdida) y guarde su PDF optimizado en su dispositivo."
        }
      ],
      "faqs": [
        {
          "question": "¿Mis archivos se cargan en el servidor durante este proceso?",
          "answer": "No. Los archivos se fusionan y comprimen completamente dentro de la memoria de su navegador mediante bibliotecas locales. No se envían datos en línea."
        },
        {
          "question": "¿Puedo también proteger con contraseña el archivo combinado?",
          "answer": "Sí, puede continuar encadenando pasando la salida comprimida a la herramienta 'Proteger PDF' para bloquearla con una contraseña antes de guardarla."
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "Cómo embellecer y codificar datos JSON en Base64 de forma segura",
      "metaDescription": "Valide, formatee y codifique cargas JSON en Base64 con un solo clic. Privacidad completa del navegador local para credenciales confidenciales del codificador.",
      "description": "Los desarrolladores frecuentemente necesitan formatear cargas útiles de respuesta JSON sin formato y codificarlas en Base64 para parámetros de consulta o scripts de configuración. ZeroWebTools conecta estos pasos, lo que le permite embellecer JSON sin formato, validar la sintaxis y codificar instantáneamente en Base64 el resultado completamente en el lado del cliente.",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "Paso 1: embellecer JSON sin formato",
          "description": "Pegue sus datos JSON sin procesar o minimizados en el Formateador. La herramienta resalta claves, valores y señala cualquier error de sintaxis al instante.",
          "toolId": "json-formatter"
        },
        {
          "title": "Paso 2: Encadenar al codificador Base64",
          "description": "Haga clic en el botón 'Codificación Base64' en el encabezado de salida para transferir instantáneamente el JSON limpio y formateado directamente al espacio de trabajo del codificador Base64.",
          "toolId": "base64-encoder"
        },
        {
          "title": "Paso 3: copiar la salida codificada",
          "description": "La cadena codificada en Base64 se genera instantáneamente en el bloque de salida. Cópialo a tu portapapeles con un solo clic."
        }
      ],
      "faqs": [
        {
          "question": "¿Es seguro formatear credenciales o claves?",
          "answer": "Sí. Todo el formateo y la codificación Base64 se ejecutan localmente en su máquina, lo que garantiza una privacidad total de las credenciales, tokens de sesión y claves."
        },
        {
          "question": "¿Puedo también minimizar el JSON antes de codificarlo?",
          "answer": "Sí, puede alternar el botón 'Minificar' en el espacio de trabajo del formateador JSON antes de pasarlo al codificador Base64."
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "Cómo convertir HEIC a JPG y cambiar el tamaño de imágenes de iPhone en masa",
      "metaDescription": "Convierta fotos Apple HEIC a formato JPG y cambie el tamaño de las dimensiones por lotes. Ejecución rápida y local del navegador con total privacidad.",
      "description": "Las fotos HEIC del iPhone son de alta calidad pero son incompatibles con muchos portales web y, a menudo, son demasiado grandes para compartirlas. ZeroWebTools combina conversión y cambio de tamaño en un único flujo de trabajo del navegador. Convierta fotos de Apple a JPG y cambie el tamaño de su ancho/alto por lotes sin cargar un solo píxel.",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "Paso 1: Cargue y convierta fotos HEIC",
          "description": "Coloque sus archivos HEIC en el convertidor. Seleccione salida JPG o PNG, elija la configuración de calidad y convierta.",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "Paso 2: Cambiar el tamaño de la cadena a la imagen",
          "description": "Una vez convertido, seleccione 'Redimensionamiento masivo' para enviar los archivos JPEG recién generados directamente al espacio de trabajo de Resizador de imágenes masivo.",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "Paso 3: escalar y comprimir dimensiones",
          "description": "Establezca el ancho, el alto o el porcentaje de escala. Comprima al peso de archivo que desee y descargue el lote como un ZIP limpio."
        }
      ],
      "faqs": [
        {
          "question": "¿Mis fotografías personales están cargadas en su servidor?",
          "answer": "No. La decodificación de imágenes (HEIC) y el escalado/compresión se procesan localmente en la GPU/CPU de su dispositivo. Tus fotos permanecen completamente seguras."
        },
        {
          "question": "¿Qué formato es mejor para el rendimiento web?",
          "answer": "Es muy recomendable convertir HEIC a WEBP o JPG comprimido y reducir las dimensiones para cargas de página y SEO más rápidos."
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "Cómo generar contraseñas seguras y calcular sumas de comprobación hash",
      "metaDescription": "Genere contraseñas criptográficamente seguras y calcule sus hashes SHA-256 localmente. Utilidad de navegador seguro para la configuración de bases de datos.",
      "description": "Los administradores y desarrolladores de sistemas con frecuencia necesitan generar contraseñas aleatorias de alta entropía y calcular sus sumas de comprobación de hash criptográficas (como SHA-256 o MD5) para las credenciales de bases de datos o configuraciones de usuarios. Esta receta le guiará para hacer esto instantáneamente en su navegador sin transferencias de red.",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "Paso 1: cree una contraseña segura",
          "description": "Utilice el Generador de contraseñas para crear una contraseña segura y aleatoria. Personalice la longitud, los números y los símbolos para lograr una alta entropía.",
          "toolId": "password-generator"
        },
        {
          "title": "Paso 2: Generador de cadena a hash",
          "description": "Seleccione 'Calcular Hash' para pasar instantáneamente la cadena de contraseña generada directamente al espacio de trabajo File and String Hasher.",
          "toolId": "file-hasher"
        },
        {
          "title": "Paso 3: seleccione el algoritmo y copie el resumen",
          "description": "Elija su resumen criptográfico (SHA-256, SHA-512 o MD5) para generar el hash al instante. Copie el valor a su portapapeles."
        }
      ],
      "faqs": [
        {
          "question": "¿El generador de contraseñas es seguro contra rastreadores en línea?",
          "answer": "Sí, la generación utiliza el CSPRNG (Web Crypto API) nativo del navegador localmente en la memoria, lo que garantiza que no se filtren valores clave en línea."
        },
        {
          "question": "¿Puedo hacer hash de archivos con esta herramienta?",
          "answer": "Sí, File Hasher admite el hash tanto de cadenas de texto sin formato (como contraseñas) como de archivos físicos cargados localmente."
        }
      ]
    }
  ],
  "de": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "So führen Sie PDF-Dateien offline auf einmal zusammen und komprimieren sie",
      "metaDescription": "Erfahren Sie, wie Sie mehrere PDF-Dateien kombinieren und die Dateigröße ohne Download-Upload-Schleifen sofort komprimieren. 100 % privat und offline.",
      "description": "Das Kombinieren und Verkleinern von PDF-Dokumenten erfordert normalerweise das Hochladen von Dateien in separate Webkonverter, das Herunterladen einer kombinierten Datei, das Umbenennen und das erneute Hochladen zum Komprimieren. ZeroWebTools vereinfacht dies durch eine verbundene visuelle Pipeline. Führen Sie beide Vorgänge in einem einzigen Browser-Tab aus, ohne Server-Uploads.",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "Schritt 1: Führen Sie Ihre PDFs zusammen",
          "description": "Öffnen Sie das Tool „PDF zusammenführen“, laden Sie Ihre Dokumente hoch, ordnen Sie die Seitenreihenfolge visuell neu und klicken Sie auf „Zusammenführen“.",
          "toolId": "pdf-merge"
        },
        {
          "title": "Schritt 2: Mikrokette zum Komprimieren",
          "description": "Klicken Sie nach dem Zusammenführen nicht auf den Download, sondern auf die integrierte Schaltfläche „Komprimieren“, um das zusammengeführte Dokument automatisch direkt an den Kompressor-Arbeitsbereich zu übergeben.",
          "toolId": "pdf-compress"
        },
        {
          "title": "Schritt 3: Wählen Sie „Komprimierung und Download“.",
          "description": "Wählen Sie die gewünschte Komprimierungsstufe (Ausgewogen, Extrem oder Verlustfrei) und speichern Sie Ihr optimiertes PDF auf Ihrem Gerät."
        }
      ],
      "faqs": [
        {
          "question": "Werden meine Dateien während dieser Pipeline auf den Server hochgeladen?",
          "answer": "Nein. Die Dateien werden mithilfe lokaler Bibliotheken vollständig im Speicher Ihres Browsers zusammengeführt und komprimiert. Es werden keine Daten online versendet."
        },
        {
          "question": "Kann ich die zusammengeführte Datei auch mit einem Passwort schützen?",
          "answer": "Ja, Sie können die Verkettung fortsetzen, indem Sie die komprimierte Ausgabe an das Tool „PDF schützen“ übergeben, um sie vor dem Speichern mit einem Passwort zu sperren."
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "So verschönern und Base64-kodieren Sie JSON-Daten sicher",
      "metaDescription": "Validieren, formatieren und kodieren Sie JSON-Nutzlasten mit einem Klick in Base64. Vollständiger lokaler Browser-Datenschutz für vertrauliche Anmeldeinformationen des Programmierers.",
      "description": "Entwickler müssen häufig rohe JSON-Antwortnutzlasten formatieren und sie für Abfrageparameter oder Konfigurationsskripts in Base64 kodieren. ZeroWebTools verbindet diese Schritte und ermöglicht es Ihnen, rohes JSON zu verschönern, die Syntax zu validieren und das Ergebnis sofort vollständig clientseitig mit Base64 zu kodieren.",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "Schritt 1: Raw JSON verschönern",
          "description": "Fügen Sie Ihre rohen oder minimierten JSON-Daten in den Formatierer ein. Das Tool hebt Schlüssel und Werte hervor und markiert alle Syntaxfehler sofort.",
          "toolId": "json-formatter"
        },
        {
          "title": "Schritt 2: Verkettung zum Base64-Encoder",
          "description": "Klicken Sie im Ausgabeheader auf die Schaltfläche „Base64-Encode“, um den sauberen, formatierten JSON-Code sofort direkt in den Base64-Encoder-Arbeitsbereich zu übertragen.",
          "toolId": "base64-encoder"
        },
        {
          "title": "Schritt 3: Kodierte Ausgabe kopieren",
          "description": "Die Base64-codierte Zeichenfolge wird sofort im Ausgabeblock generiert. Kopieren Sie es mit einem einzigen Klick in Ihre Zwischenablage."
        }
      ],
      "faqs": [
        {
          "question": "Ist es sicher, Anmeldeinformationen oder Schlüssel zu formatieren?",
          "answer": "Ja. Die gesamte Formatierung und Base64-Codierung wird lokal auf Ihrem Computer ausgeführt und gewährleistet so den vollständigen Datenschutz für Anmeldeinformationen, Sitzungstokens und Schlüssel."
        },
        {
          "question": "Kann ich den JSON auch vor dem Codieren verkleinern?",
          "answer": "Ja, Sie können die Schaltfläche „Minimieren“ im Arbeitsbereich „JSON Formatter“ umschalten, bevor Sie sie an den Base64-Encoder übergeben."
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "So konvertieren Sie HEIC in JPG und ändern die Größe von iPhone-Bildern in großen Mengen",
      "metaDescription": "Konvertieren Sie Apple HEIC-Fotos in das JPG-Format und ändern Sie die Größe im Stapel. Schnelle, lokale Browserausführung mit vollständiger Privatsphäre.",
      "description": "iPhone HEIC-Fotos sind von hoher Qualität, aber mit vielen Webportalen nicht kompatibel und oft zu groß, um sie zu teilen. ZeroWebTools kombiniert Konvertierung und Größenänderung in einem einzigen Browser-Workflow. Konvertieren Sie Apple-Fotos in JPG und ändern Sie deren Breite/Höhe im Stapel, ohne ein einziges Pixel hochzuladen.",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "Schritt 1: HEIC-Fotos hochladen und konvertieren",
          "description": "Legen Sie Ihre HEIC-Dateien im Konverter ab. Wählen Sie JPG- oder PNG-Ausgabe, wählen Sie Qualitätseinstellungen und konvertieren Sie.",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "Schritt 2: Kette zum Image Resizer",
          "description": "Wählen Sie nach der Konvertierung „Bulk Resize“, um die neu generierten JPEGs direkt an den Bulk Image Resizer-Arbeitsbereich zu senden.",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "Schritt 3: Dimensionen skalieren und komprimieren",
          "description": "Legen Sie Breite, Höhe oder Skalierungsprozentsatz fest. Komprimieren Sie es auf die gewünschte Dateigröße und laden Sie den Stapel als saubere ZIP-Datei herunter."
        }
      ],
      "faqs": [
        {
          "question": "Werden meine persönlichen Fotos auf Ihren Server hochgeladen?",
          "answer": "Nein. Die Bilddekodierung (HEIC) und Skalierung/Komprimierung werden lokal auf der GPU/CPU Ihres Geräts verarbeitet. Ihre Fotos bleiben absolut sicher."
        },
        {
          "question": "Welches Format eignet sich am besten für die Webleistung?",
          "answer": "Für schnellere Seitenladevorgänge und SEO wird dringend empfohlen, HEIC in WEBP oder komprimiertes JPG zu konvertieren und die Abmessungen zu verkleinern."
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "So generieren Sie sichere Passwörter und berechnen Hash-Prüfsummen",
      "metaDescription": "Generieren Sie kryptografisch sichere Passwörter und berechnen Sie deren SHA-256-Hashes lokal. Sicheres Browser-Dienstprogramm für die Datenbankeinrichtung.",
      "description": "Systemadministratoren und Entwickler müssen häufig zufällige Passwörter mit hoher Entropie generieren und ihre kryptografischen Hash-Prüfsummen (wie SHA-256 oder MD5) für Datenbankanmeldeinformationen oder Benutzerkonfigurationen berechnen. Dieses Rezept führt Sie durch die sofortige Durchführung dieses Vorgangs in Ihrem Browser ohne Netzwerkübertragungen.",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "Schritt 1: Erstellen Sie ein sicheres Passwort",
          "description": "Verwenden Sie den Passwortgenerator, um ein sicheres, zufälliges Passwort zu erstellen. Passen Sie Länge, Zahlen und Symbole an, um eine hohe Entropie zu erreichen.",
          "toolId": "password-generator"
        },
        {
          "title": "Schritt 2: Zum Hash-Generator verketten",
          "description": "Wählen Sie „Hash berechnen“, um die generierte Passwortzeichenfolge sofort direkt an den Arbeitsbereich „Datei- und Zeichenfolgen-Hasher“ zu übergeben.",
          "toolId": "file-hasher"
        },
        {
          "title": "Schritt 3: Wählen Sie „Algorithmus & Copy Digest“.",
          "description": "Wählen Sie Ihren kryptografischen Digest (SHA-256, SHA-512 oder MD5), um den Hash sofort zu generieren. Kopieren Sie den Wert in Ihre Zwischenablage."
        }
      ],
      "faqs": [
        {
          "question": "Ist der Passwortgenerator sicher vor Online-Trackern?",
          "answer": "Ja, die Generierung verwendet das native CSPRNG (Web Crypto API) des Browsers lokal im Speicher, um sicherzustellen, dass keine Schlüsselwerte online verloren gehen."
        },
        {
          "question": "Kann ich mit diesem Tool Dateien hashen?",
          "answer": "Ja, der File Hasher unterstützt das Hashing sowohl von Rohtextzeichenfolgen (wie Passwörtern) als auch von lokal hochgeladenen physischen Dateien."
        }
      ]
    }
  ],
  "fr": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "Comment fusionner et compresser des fichiers PDF hors ligne en une seule fois",
      "metaDescription": "Apprenez à combiner plusieurs fichiers PDF et à compresser immédiatement la taille du fichier sans boucles de téléchargement-téléchargement. 100% privé et hors ligne.",
      "description": "La combinaison et la réduction de documents PDF nécessitent généralement de télécharger des fichiers vers des convertisseurs Web séparés, de télécharger un fichier combiné, de le renommer et de le télécharger à nouveau pour le compresser. ZeroWebTools simplifie cela avec un pipeline visuel connecté. Effectuez les deux opérations dans un seul onglet de navigateur, sans aucun téléchargement sur le serveur.",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "Étape 1 : Fusionnez vos PDF",
          "description": "Ouvrez l'outil Fusionner PDF, téléchargez vos documents, réorganisez visuellement l'ordre des pages et cliquez sur Fusionner.",
          "toolId": "pdf-merge"
        },
        {
          "title": "Étape 2 : Microchaîne à compresser",
          "description": "Une fois fusionné, au lieu de le télécharger, cliquez sur le bouton « Compresser » en ligne pour transmettre automatiquement le document fusionné directement à l'espace de travail de Compressor.",
          "toolId": "pdf-compress"
        },
        {
          "title": "Étape 3 : Choisissez Compression et téléchargement",
          "description": "Sélectionnez le niveau de compression souhaité (Équilibré, Extrême ou Sans perte) et enregistrez votre PDF optimisé sur votre appareil."
        }
      ],
      "faqs": [
        {
          "question": "Mes fichiers sont-ils téléchargés sur le serveur pendant ce pipeline ?",
          "answer": "Non. Les fichiers sont fusionnés et compressés entièrement dans la mémoire de votre navigateur à l'aide de bibliothèques locales. Aucune donnée n'est envoyée en ligne."
        },
        {
          "question": "Puis-je également protéger par mot de passe le fichier fusionné ?",
          "answer": "Oui, vous pouvez continuer le chaînage en transmettant la sortie compressée dans l'outil « Protéger le PDF » pour la verrouiller avec un mot de passe avant de l'enregistrer."
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "Comment embellir et encoder en Base64 les données JSON en toute sécurité",
      "metaDescription": "Validez, formatez et encodez les charges utiles JSON en Base64 en un seul clic. Confidentialité totale du navigateur local pour les informations d'identification sensibles du codeur.",
      "description": "Les développeurs doivent souvent formater les charges utiles de réponse JSON brutes et les coder en Base64 pour les paramètres de requête ou les scripts de configuration. ZeroWebTools connecte ces étapes, vous permettant d'embellir le JSON brut, de valider la syntaxe et d'encoder instantanément en Base64 le résultat entièrement côté client.",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "Étape 1 : embellir le JSON brut",
          "description": "Collez vos données JSON brutes ou minifiées dans le formateur. L'outil met en évidence les clés, les valeurs et signale instantanément toute erreur de syntaxe.",
          "toolId": "json-formatter"
        },
        {
          "title": "Étape 2 : chaîner vers l'encodeur Base64",
          "description": "Cliquez sur le bouton « Base64 Encode » dans l’en-tête de sortie pour transférer instantanément le JSON propre et formaté directement dans l’espace de travail de l’encodeur Base64.",
          "toolId": "base64-encoder"
        },
        {
          "title": "Étape 3 : Copier la sortie codée",
          "description": "La chaîne codée en Base64 est générée instantanément dans le bloc de sortie. Copiez-le dans votre presse-papiers en un seul clic."
        }
      ],
      "faqs": [
        {
          "question": "Est-il sécuritaire de formater les informations d’identification ou les clés ?",
          "answer": "Oui. Tous les formats et codages Base64 sont exécutés localement sur votre ordinateur, garantissant ainsi une confidentialité totale des informations d'identification, des jetons de session et des clés."
        },
        {
          "question": "Puis-je également réduire le JSON avant de l’encoder ?",
          "answer": "Oui, vous pouvez activer le bouton « Réduire » dans l'espace de travail du formateur JSON avant de le transmettre à l'encodeur Base64."
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "Comment convertir HEIC en JPG et redimensionner en masse les images iPhone",
      "metaDescription": "Convertissez les photos Apple HEIC au format JPG et redimensionnez les dimensions par lots. Exécution rapide et locale du navigateur avec une confidentialité totale.",
      "description": "Les photos HEIC de l'iPhone sont de haute qualité mais incompatibles avec de nombreux portails Web et sont souvent trop volumineuses pour être partagées. ZeroWebTools combine la conversion et le redimensionnement dans un seul flux de travail de navigateur. Convertissez les photos Apple en JPG et redimensionnez leur largeur/hauteur par lots sans télécharger un seul pixel.",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "Étape 1 : Téléchargez et convertissez des photos HEIC",
          "description": "Déposez vos fichiers HEIC dans le convertisseur. Sélectionnez la sortie JPG ou PNG, choisissez les paramètres de qualité et convertissez.",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "Étape 2 : Chaîner vers le redimensionneur d'image",
          "description": "Une fois converti, sélectionnez « Bulk Resize » pour envoyer les fichiers JPEG nouvellement générés directement dans l'espace de travail Bulk Image Resizer.",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "Étape 3 : Mettre à l'échelle et compresser les dimensions",
          "description": "Définissez la largeur, la hauteur ou le pourcentage d’échelle. Compressez au poids de fichier souhaité et téléchargez le lot sous forme de ZIP propre."
        }
      ],
      "faqs": [
        {
          "question": "Mes photos personnelles sont-elles téléchargées sur votre serveur ?",
          "answer": "Non. Le décodage d'image (HEIC) et la mise à l'échelle/compression sont traités localement sur le GPU/CPU de votre appareil. Vos photos restent entièrement sécurisées."
        },
        {
          "question": "Quel format est le meilleur pour les performances Web ?",
          "answer": "La conversion de HEIC en WEBP ou en JPG compressé et la réduction des dimensions sont fortement recommandées pour un chargement de page et un référencement plus rapides."
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "Comment générer des mots de passe sécurisés et calculer les sommes de contrôle de hachage",
      "metaDescription": "Générez des mots de passe cryptographiquement sécurisés et calculez localement leurs hachages SHA-256. Utilitaire de navigateur sécurisé pour la configuration de la base de données.",
      "description": "Les administrateurs système et les développeurs doivent souvent générer des mots de passe aléatoires à haute entropie et calculer leurs sommes de contrôle de hachage cryptographique (comme SHA-256 ou MD5) pour les informations d'identification de base de données ou les configurations utilisateur. Cette recette vous guide pour effectuer cette opération instantanément dans votre navigateur sans transferts réseau.",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "Étape 1 : Créer un mot de passe sécurisé",
          "description": "Utilisez le générateur de mot de passe pour créer un mot de passe fort et aléatoire. Personnalisez la longueur, les nombres et les symboles pour obtenir une entropie élevée.",
          "toolId": "password-generator"
        },
        {
          "title": "Étape 2 : Chaîne vers le générateur de hachage",
          "description": "Sélectionnez « Calculer le hachage » pour transmettre instantanément la chaîne de mot de passe générée directement dans l'espace de travail File and String Hasher.",
          "toolId": "file-hasher"
        },
        {
          "title": "Étape 3 : Sélectionnez l'algorithme et copiez le résumé",
          "description": "Choisissez votre résumé cryptographique (SHA-256, SHA-512 ou MD5) pour générer le hachage instantanément. Copiez la valeur dans votre presse-papiers."
        }
      ],
      "faqs": [
        {
          "question": "Le générateur de mots de passe est-il sécurisé contre les trackers en ligne ?",
          "answer": "Oui, la génération utilise le CSPRNG (Web Crypto API) natif du navigateur localement en mémoire, garantissant qu'aucune valeur de clé ne soit divulguée en ligne."
        },
        {
          "question": "Puis-je hacher des fichiers avec cet outil ?",
          "answer": "Oui, File Hasher prend en charge le hachage à la fois des chaînes de texte brut (comme les mots de passe) et des fichiers physiques téléchargés localement."
        }
      ]
    }
  ],
  "pt": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "Como mesclar e compactar arquivos PDF off-line de uma só vez",
      "metaDescription": "Aprenda como combinar vários arquivos PDF e compactar imediatamente o tamanho do arquivo sem loops de download e upload. 100% privado e offline.",
      "description": "Combinar e reduzir documentos PDF geralmente requer o upload de arquivos para conversores da web separados, o download de um arquivo combinado, renomeá-lo e carregá-lo novamente para compactação. ZeroWebTools simplifica isso com um pipeline visual conectado. Execute ambas as operações em uma única guia do navegador, sem nenhum upload no servidor.",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "Passo 1: Mesclar seus PDFs",
          "description": "Abra a ferramenta Mesclar PDF, carregue seus documentos, reorganize visualmente a ordem das páginas e clique em Mesclar.",
          "toolId": "pdf-merge"
        },
        {
          "title": "Etapa 2: Microchain para compactar",
          "description": "Uma vez mesclado, em vez de fazer download, clique no botão embutido 'Compactar' para passar automaticamente o documento mesclado diretamente para a área de trabalho do Compressor.",
          "toolId": "pdf-compress"
        },
        {
          "title": "Etapa 3: escolha compactação e download",
          "description": "Selecione o nível de compactação desejado (Balanceado, Extremo ou Sem Perdas) e salve o PDF otimizado em seu dispositivo."
        }
      ],
      "faqs": [
        {
          "question": "Meus arquivos são carregados no servidor durante esse pipeline?",
          "answer": "Não. Os arquivos são mesclados e compactados inteiramente na memória do seu navegador usando bibliotecas locais. Nenhum dado é enviado online."
        },
        {
          "question": "Também posso proteger com senha o arquivo mesclado?",
          "answer": "Sim, você pode continuar o encadeamento passando a saída compactada para a ferramenta 'Proteger PDF' para bloqueá-la com uma senha antes de salvar."
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "Como embelezar e codificar dados JSON em Base64 com segurança",
      "metaDescription": "Valide, formate e codifique cargas JSON para Base64 com um clique. Privacidade completa do navegador local para credenciais confidenciais do codificador.",
      "description": "Os desenvolvedores frequentemente precisam formatar cargas úteis de resposta JSON brutas e codificá-las em Base64 para parâmetros de consulta ou scripts de configuração. ZeroWebTools conecta essas etapas, permitindo embelezar JSON bruto, validar a sintaxe e codificar instantaneamente o resultado em Base64 inteiramente no lado do cliente.",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "Etapa 1: embelezar JSON bruto",
          "description": "Cole seus dados JSON brutos ou reduzidos no Formatador. A ferramenta destaca chaves, valores e sinaliza quaisquer erros de sintaxe instantaneamente.",
          "toolId": "json-formatter"
        },
        {
          "title": "Etapa 2: encadear para codificador Base64",
          "description": "Clique no botão 'Codificação Base64' no cabeçalho de saída para transferir instantaneamente o JSON limpo e formatado diretamente para o espaço de trabalho do codificador Base64.",
          "toolId": "base64-encoder"
        },
        {
          "title": "Etapa 3: copiar saída codificada",
          "description": "A string codificada em Base64 é gerada instantaneamente no bloco de saída. Copie-o para a área de transferência com um único clique."
        }
      ],
      "faqs": [
        {
          "question": "É seguro formatar credenciais ou chaves?",
          "answer": "Sim. Toda a formatação e codificação Base64 são executadas localmente em sua máquina, garantindo total privacidade para credenciais, tokens de sessão e chaves."
        },
        {
          "question": "Também posso reduzir o JSON antes de codificá-lo?",
          "answer": "Sim, você pode alternar o botão 'Minificar' na área de trabalho do JSON Formatter antes de passá-lo para o codificador Base64."
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "Como converter HEIC para JPG e redimensionar imagens do iPhone em massa",
      "metaDescription": "Converta fotos HEIC da Apple para o formato JPG e redimensione as dimensões em lote. Execução rápida e local do navegador com total privacidade.",
      "description": "As fotos HEIC do iPhone são de alta qualidade, mas incompatíveis com muitos portais da web e geralmente são grandes demais para serem compartilhadas. ZeroWebTools combina conversão e redimensionamento em um único fluxo de trabalho de navegador. Converta fotos da Apple em JPG e redimensione sua largura/altura em lote sem carregar um único pixel.",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "Etapa 1: fazer upload e converter fotos HEIC",
          "description": "Solte seus arquivos HEIC no conversor. Selecione a saída JPG ou PNG, escolha as configurações de qualidade e converta.",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "Etapa 2: encadear para redimensionador de imagem",
          "description": "Depois de convertido, selecione 'Bulk Resize' para enviar os JPEGs recém-gerados diretamente para a área de trabalho do Bulk Image Resizer.",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "Etapa 3: dimensionar e compactar dimensões",
          "description": "Defina largura, altura ou porcentagem de escala. Compacte no peso de arquivo desejado e baixe o lote como um ZIP limpo."
        }
      ],
      "faqs": [
        {
          "question": "Minhas fotografias pessoais são enviadas para o seu servidor?",
          "answer": "Não. A decodificação de imagem (HEIC) e o dimensionamento/compactação são processados ​​localmente na GPU/CPU do seu dispositivo. Suas fotos permanecem totalmente seguras."
        },
        {
          "question": "Qual formato é melhor para desempenho na web?",
          "answer": "Converter HEIC em WEBP ou JPG compactado e reduzir dimensões é altamente recomendado para carregamentos de página mais rápidos e SEO."
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "Como gerar senhas seguras e calcular somas de verificação de hash",
      "metaDescription": "Gere senhas criptograficamente seguras e calcule seus hashes SHA-256 localmente. Utilitário de navegador seguro para configuração de banco de dados.",
      "description": "Os administradores de sistema e desenvolvedores frequentemente precisam gerar senhas aleatórias e de alta entropia e calcular suas somas de verificação de hash criptográfico (como SHA-256 ou MD5) para credenciais de banco de dados ou configurações de usuário. Esta receita orienta você a fazer isso instantaneamente em seu navegador, sem transferências de rede.",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "Passo 1: Crie uma senha segura",
          "description": "Use o Gerador de Senhas para criar uma senha forte e aleatória. Personalize comprimento, números e símbolos para obter alta entropia.",
          "toolId": "password-generator"
        },
        {
          "title": "Etapa 2: Gerador de cadeia para hash",
          "description": "Selecione 'Calcular Hash' para passar instantaneamente a string de senha gerada diretamente para o espaço de trabalho File and String Hasher.",
          "toolId": "file-hasher"
        },
        {
          "title": "Etapa 3: selecione algoritmo e resumo de cópia",
          "description": "Escolha seu resumo criptográfico (SHA-256, SHA-512 ou MD5) para gerar o hash instantaneamente. Copie o valor para sua área de transferência."
        }
      ],
      "faqs": [
        {
          "question": "O gerador de senhas é seguro contra rastreadores online?",
          "answer": "Sim, a geração usa o CSPRNG (Web Crypto API) nativo do navegador localmente na memória, garantindo que nenhum valor-chave vaze online."
        },
        {
          "question": "Posso fazer hash de arquivos com esta ferramenta?",
          "answer": "Sim, o File Hasher suporta hash de strings de texto bruto (como senhas) e arquivos físicos carregados localmente."
        }
      ]
    }
  ],
  "ja": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "PDF ファイルをオフラインで一度に結合して圧縮する方法",
      "metaDescription": "複数の PDF ファイルを結合し、ダウンロードとアップロードのループを発生させずにファイル サイズを即座に圧縮する方法を学びます。 100%プライベートかつオフライン。",
      "description": "PDF ドキュメントを結合および縮小するには、通常、ファイルを別の Web コンバータにアップロードし、結合されたファイルをダウンロードして名前を変更し、再度アップロードして圧縮する必要があります。 ZeroWebTools は、接続されたビジュアル パイプラインを使用してこれを簡素化します。サーバーへのアップロードを行わずに、両方の操作を単一のブラウザー タブ内で実行します。",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "ステップ 1: PDF を結合する",
          "description": "PDF の結合ツールを開き、ドキュメントをアップロードし、ページの順序を視覚的に並べ替えて、「結合」をクリックします。",
          "toolId": "pdf-merge"
        },
        {
          "title": "ステップ 2: マイクロチェーンを圧縮する",
          "description": "結合したら、ダウンロードする代わりに、インラインの「圧縮」ボタンをクリックすると、結合されたドキュメントが直接 Compressor ワークスペースに自動的に渡されます。",
          "toolId": "pdf-compress"
        },
        {
          "title": "ステップ 3: 圧縮とダウンロードを選択する",
          "description": "希望の圧縮レベル (バランス、エクストリーム、またはロスレス) を選択し、最適化された PDF をデバイスに保存します。"
        }
      ],
      "faqs": [
        {
          "question": "このパイプライン中にファイルはサーバーにアップロードされますか?",
          "answer": "いいえ。ファイルはローカル ライブラリを使用してブラウザのメモリ内で完全にマージされ、圧縮されます。データはオンラインで送信されません。"
        },
        {
          "question": "結合したファイルをパスワードで保護することもできますか?",
          "answer": "はい、圧縮出力を「PDF 保護」ツールに渡し、保存する前にパスワードでロックすることでチェーンを続行できます。"
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "JSON データを美しくし、安全に Base64 エンコードする方法",
      "metaDescription": "ワンクリックで JSON ペイロードを検証、フォーマットし、Base64 にエンコードします。機密性の高いコーダー資格情報に対する完全なローカル ブラウザーのプライバシー。",
      "description": "開発者は、生の JSON 応答ペイロードをフォーマットし、クエリ パラメーターまたは構成スクリプト用に Base64 にエンコードする必要が頻繁にあります。 ZeroWebTools はこれらのステップを接続して、生の JSON を美しくし、構文を検証し、結果をクライアント側で即座に Base64 エンコードできるようにします。",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "ステップ 1: 生の JSON を美しくする",
          "description": "生または縮小された JSON データをフォーマッタに貼り付けます。このツールは、キー、値を強調表示し、構文エラーに即座にフラグを立てます。",
          "toolId": "json-formatter"
        },
        {
          "title": "ステップ 2: Base64 エンコーダーにチェーンする",
          "description": "出力ヘッダーの「Base64 エンコード」ボタンをクリックすると、クリーンでフォーマットされた JSON が Base64 エンコーダー ワークスペースに直接転送されます。",
          "toolId": "base64-encoder"
        },
        {
          "title": "ステップ 3: エンコードされた出力をコピーする",
          "description": "Base64 でエンコードされた文字列が出力ブロックに即座に生成されます。ワンクリックでクリップボードにコピーします。"
        }
      ],
      "faqs": [
        {
          "question": "認証情報またはキーをフォーマットしても安全ですか?",
          "answer": "はい。すべてのフォーマットと Base64 エンコードはマシン上でローカルに実行され、資格情報、セッション トークン、およびキーの完全なプライバシーが保証されます。"
        },
        {
          "question": "JSON をエンコードする前に縮小することもできますか?",
          "answer": "はい、Base64 エンコーダーに渡す前に、JSON Formatter ワークスペースの「縮小」ボタンを切り替えることができます。"
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "HEIC を JPG に変換し、iPhone 画像のサイズを一括変更する方法",
      "metaDescription": "Apple HEIC 写真を JPG 形式に変換し、バッチでサイズを変更します。完全なプライバシーを備えた高速なローカル ブラウザ実行。",
      "description": "iPhone HEIC 写真は高品質ですが、多くの Web ポータルと互換性がなく、共有するには大きすぎることがよくあります。 ZeroWebTools は、単一のブラウザーのワークフローで変換とサイズ変更を組み合わせます。 Apple の写真を JPG に変換し、ピクセルを 1 つもアップロードせずに、幅と高さを一括で変更します。",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "ステップ 1: HEIC 写真をアップロードして変換する",
          "description": "HEIC ファイルをコンバータにドロップします。 JPG または PNG 出力を選択し、品質設定を選択して変換します。",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "ステップ 2: Image Resizer へのチェーン",
          "description": "変換したら、「Bulk Resize」を選択して、新しく生成された JPEG を Bulk Image Resizer ワークスペースに直接送信します。",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "ステップ 3: 寸法の拡大縮小と圧縮",
          "description": "幅、高さ、またはスケールのパーセンテージを設定します。希望のファイル重量に圧縮し、バッチをクリーンな ZIP としてダウンロードします。"
        }
      ],
      "faqs": [
        {
          "question": "私の個人的な写真はあなたのサーバーにアップロードされますか?",
          "answer": "いいえ。画像のデコード (HEIC) とスケーリング/圧縮は、デバイスの GPU/CPU でローカルに処理されます。写真は完全に安全に保たれます。"
        },
        {
          "question": "Web パフォーマンスに最適な形式はどれですか?",
          "answer": "ページの読み込みと SEO を高速化するには、HEIC を WEBP または圧縮 JPG に変換し、サイズを縮小することを強くお勧めします。"
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "安全なパスワードを生成し、ハッシュ チェックサムを計算する方法",
      "metaDescription": "暗号的に安全なパスワードを生成し、その SHA-256 ハッシュをローカルで計算します。データベースをセットアップするための安全なブラウザ ユーティリティ。",
      "description": "システム管理者や開発者は、ランダムな高エントロピーのパスワードを生成し、データベース資格情報やユーザー構成の暗号化ハッシュ チェックサム (SHA-256 や MD5 など) を計算する必要が頻繁にあります。このレシピでは、ネットワーク転送を行わずにブラウザでこれを即座に実行する方法を説明します。",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "ステップ 1: 安全なパスワードを作成する",
          "description": "パスワード ジェネレーターを使用して、強力なランダムなパスワードを作成します。長さ、数値、記号をカスタマイズして、高いエントロピーを実現します。",
          "toolId": "password-generator"
        },
        {
          "title": "ステップ 2: チェーンからハッシュへのジェネレーター",
          "description": "「ハッシュの計算」を選択すると、生成されたパスワード文字列がファイルおよび文字列ハッシュのワークスペースに直接渡されます。",
          "toolId": "file-hasher"
        },
        {
          "title": "ステップ 3: アルゴリズムの選択とダイジェストのコピー",
          "description": "暗号ダイジェスト (SHA-256、SHA-512、または MD5) を選択して、ハッシュを即座に生成します。値をクリップボードにコピーします。"
        }
      ],
      "faqs": [
        {
          "question": "パスワード生成ツールはオンライン トラッカーに対して安全ですか?",
          "answer": "はい、生成ではブラウザーのネイティブ CSPRNG (Web Crypto API) をメモリ内でローカルに使用し、キー値がオンラインに漏洩しないようにします。"
        },
        {
          "question": "このツールでファイルをハッシュできますか?",
          "answer": "はい、File Hasher は、生のテキスト文字列 (パスワードなど) とローカルにアップロードされた物理ファイルの両方のハッシュ化をサポートしています。"
        }
      ]
    }
  ],
  "zh": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "如何一次性离线合并和压缩 PDF 文件",
      "metaDescription": "了解如何合并多个 PDF 文件并立即压缩文件大小，而无需下载-上传循环。 100% 私密且离线。",
      "description": "合并和缩小 PDF 文档通常需要将文件上传到单独的 Web 转换器，下载合并的文件，重命名，然后再次上传进行压缩。 ZeroWebTools 通过连接的可视化管道简化了这一过程。在单个浏览器选项卡中执行这两项操作，服务器上传为零。",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "第 1 步：合并您的 PDF",
          "description": "打开合并 PDF 工具，上传文档，直观地重新排列页面顺序，然后单击合并。",
          "toolId": "pdf-merge"
        },
        {
          "title": "步骤2：压缩子链",
          "description": "合并后，无需下载，而是单击内联“压缩”按钮，自动将合并的文档直接传递到 Compressor 工作区。",
          "toolId": "pdf-compress"
        },
        {
          "title": "第3步：选择压缩和下载",
          "description": "选择您所需的压缩级别（平衡、极端或无损）并将优化后的 PDF 保存到您的设备。"
        }
      ],
      "faqs": [
        {
          "question": "我的文件是否会在此管道期间上传到服务器？",
          "answer": "不会。这些文件是使用本地库完全在您的浏览器内存中合并和压缩的。没有数据在线发送。"
        },
        {
          "question": "我还可以用密码保护合并的文件吗？",
          "answer": "是的，您可以通过将压缩输出传递到“保护 PDF”工具中来继续链接，以便在保存之前使用密码锁定它。"
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "如何安全地美化和 Base64 编码 JSON 数据",
      "metaDescription": "一键验证、格式化 JSON 负载并将其编码为 Base64。敏感编码器凭据的完整本地浏览器隐私。",
      "description": "开发人员经常需要格式化原始 JSON 响应负载并将其编码为 Base64 以用于查询参数或配置脚本。 ZeroWebTools 连接这些步骤，使您能够美化原始 JSON、验证语法并立即在客户端对结果进行 Base64 编码。",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "第 1 步：美化原始 JSON",
          "description": "将原始或缩小的 JSON 数据粘贴到格式化程序中。该工具突出显示键、值并立即标记任何语法错误。",
          "toolId": "json-formatter"
        },
        {
          "title": "第 2 步：链接到 Base64 编码器",
          "description": "单击输出标头中的“Base64 编码”按钮，立即将干净、格式化的 JSON 直接传输到 Base64 编码器工作区。",
          "toolId": "base64-encoder"
        },
        {
          "title": "第 3 步：复制编码输出",
          "description": "Base64 编码的字符串在输出块中立即生成。只需单击一下即可将其复制到剪贴板。"
        }
      ],
      "faqs": [
        {
          "question": "格式化凭据或密钥安全吗？",
          "answer": "是的。所有格式化和 Base64 编码均在您的计算机上本地执行，确保凭证、会话令牌和密钥的完全隐私。"
        },
        {
          "question": "我还可以在编码之前缩小 JSON 吗？",
          "answer": "是的，您可以在将 JSON Formatter 传递到 Base64 编码器之前切换 JSON Formatter 工作区中的“缩小”按钮。"
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "如何将 HEIC 转换为 JPG 并批量调整 iPhone 图像大小",
      "metaDescription": "将 Apple HEIC 照片转换为 JPG 格式并批量调整尺寸。快速的本地浏览器执行，具有完全的隐私性。",
      "description": "iPhone HEIC 照片质量很高，但与许多门户网站不兼容，而且通常太大而无法共享。 ZeroWebTools 将转换和调整大小结合在单个浏览器工作流程中。将 Apple 照片转换为 JPG 并批量调整其宽度/高度，无需上传单个像素。",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "第 1 步：上传并转换 HEIC 照片",
          "description": "将您的 HEIC 文件放入转换器中。选择 JPG 或 PNG 输出，选择质量设置，然后进行转换。",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "第 2 步：链接到图像调整器",
          "description": "转换后，选择“批量调整大小”将新生成的 JPEG 直接发送到批量图像调整器工作区。",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "第 3 步：缩放和压缩尺寸",
          "description": "设置宽度、高度或比例百分比。压缩至您想要的文件大小，然后将批次下载为干净的 ZIP。"
        }
      ],
      "faqs": [
        {
          "question": "我的个人照片会上传到你们的服务器吗？",
          "answer": "不会。图像解码 (HEIC) 和缩放/压缩在设备的 GPU/CPU 上本地处理。您的照片仍然完全安全。"
        },
        {
          "question": "哪种格式最适合 Web 性能？",
          "answer": "强烈建议将 HEIC 转换为 WEBP 或压缩的 JPG 并缩小尺寸，以加快页面加载速度和 SEO。"
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "如何生成安全密码并计算哈希校验和",
      "metaDescription": "生成加密安全密码并在本地计算其 SHA-256 哈希值。用于数据库设置的安全浏览器实用程序。",
      "description": "系统管理员和开发人员经常需要生成随机的高熵密码并计算数据库凭据或用户配置的加密哈希校验和（例如 SHA-256 或 MD5）。本秘籍将指导您在浏览器中立即完成此操作，无需网络传输。",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "第 1 步：创建安全密码",
          "description": "使用密码生成器创建一个强随机密码。自定义长度、数字和符号以实现高熵。",
          "toolId": "password-generator"
        },
        {
          "title": "第 2 步：链接到哈希生成器",
          "description": "选择“计算哈希”可立即将生成的密码字符串直接传递到文件和字符串哈希器工作区。",
          "toolId": "file-hasher"
        },
        {
          "title": "第 3 步：选择算法和复制摘要",
          "description": "选择您的加密摘要（SHA-256、SHA-512 或 MD5）以立即生成哈希。将值复制到剪贴板。"
        }
      ],
      "faqs": [
        {
          "question": "密码生成器是否可以抵御在线跟踪器？",
          "answer": "是的，该生成在本地内存中使用浏览器的本机 CSPRNG（Web Crypto API），确保不会在线泄露密钥值。"
        },
        {
          "question": "我可以使用此工具对文件进行哈希处理吗？",
          "answer": "是的，文件哈希器支持对原始文本字符串（如密码）和本地上传的物理文件进行哈希处理。"
        }
      ]
    }
  ],
  "hi": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "ऑफ़लाइन पीडीएफ फाइलों को एक बार में कैसे मर्ज और कंप्रेस करें",
      "metaDescription": "जानें कि एकाधिक पीडीएफ फाइलों को कैसे संयोजित किया जाए और डाउनलोड-अपलोड लूप के बिना फ़ाइल आकार को तुरंत संपीड़ित किया जाए। 100% निजी और ऑफ़लाइन।",
      "description": "पीडीएफ दस्तावेज़ों को संयोजित करने और छोटा करने के लिए आमतौर पर अलग-अलग वेब कन्वर्टर्स पर फ़ाइलें अपलोड करने, एक संयुक्त फ़ाइल डाउनलोड करने, उसका नाम बदलने और उसे संपीड़ित करने के लिए फिर से अपलोड करने की आवश्यकता होती है। ZeroWebTools कनेक्टेड विज़ुअल पाइपलाइन के साथ इसे सरल बनाता है। शून्य सर्वर अपलोड के साथ, एक ही ब्राउज़र टैब के अंदर दोनों ऑपरेशन करें।",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "चरण 1: अपनी पीडीएफ़ मर्ज करें",
          "description": "मर्ज पीडीएफ टूल खोलें, अपने दस्तावेज़ अपलोड करें, पृष्ठ क्रम को दृश्य रूप से पुनर्व्यवस्थित करें और मर्ज पर क्लिक करें।",
          "toolId": "pdf-merge"
        },
        {
          "title": "चरण 2: संपीड़ित करने के लिए माइक्रोचेन",
          "description": "एक बार मर्ज हो जाने के बाद, डाउनलोड करने के बजाय, मर्ज किए गए दस्तावेज़ को सीधे कंप्रेसर कार्यक्षेत्र में स्वचालित रूप से पास करने के लिए इनलाइन 'कंप्रेस' बटन पर क्लिक करें।",
          "toolId": "pdf-compress"
        },
        {
          "title": "चरण 3: संपीड़न और डाउनलोड चुनें",
          "description": "अपना वांछित संपीड़न स्तर (संतुलित, चरम, या दोषरहित) चुनें और अपने अनुकूलित पीडीएफ को अपने डिवाइस में सहेजें।"
        }
      ],
      "faqs": [
        {
          "question": "क्या इस पाइपलाइन के दौरान मेरी फ़ाइलें सर्वर पर अपलोड हो जाती हैं?",
          "answer": "नहीं, फ़ाइलें पूरी तरह से स्थानीय पुस्तकालयों का उपयोग करके आपकी ब्राउज़र मेमोरी में मर्ज और संपीड़ित की जाती हैं। कोई डेटा ऑनलाइन नहीं भेजा जाता है."
        },
        {
          "question": "क्या मैं मर्ज की गई फ़ाइल को पासवर्ड से सुरक्षित भी कर सकता हूँ?",
          "answer": "हां, आप संपीड़ित आउटपुट को सहेजने से पहले पासवर्ड से लॉक करने के लिए 'प्रोटेक्ट पीडीएफ' टूल में पास करके चेनिंग जारी रख सकते हैं।"
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "JSON डेटा को सुरक्षित रूप से कैसे सुशोभित और Base64-एनकोड करें",
      "metaDescription": "एक क्लिक में JSON पेलोड को बेस64 पर सत्यापित, प्रारूपित और एन्कोड करें। संवेदनशील कोडर क्रेडेंशियल के लिए पूर्ण स्थानीय ब्राउज़र गोपनीयता।",
      "description": "डेवलपर्स को अक्सर कच्चे JSON प्रतिक्रिया पेलोड को प्रारूपित करने और क्वेरी पैरामीटर या कॉन्फ़िगरेशन स्क्रिप्ट के लिए उन्हें बेस 64 में एन्कोड करने की आवश्यकता होती है। ZeroWebTools इन चरणों को जोड़ता है, जिससे आप कच्चे JSON को सुशोभित कर सकते हैं, सिंटैक्स को मान्य कर सकते हैं और परिणाम को पूरी तरह से क्लाइंट-साइड पर तुरंत Base64-एनकोड कर सकते हैं।",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "चरण 1: रॉ JSON को सुशोभित करें",
          "description": "अपने कच्चे या छोटे JSON डेटा को फ़ॉर्मेटर में चिपकाएँ। टूल कुंजियों, मानों को हाइलाइट करता है और किसी भी सिंटैक्स त्रुटि को तुरंत चिह्नित करता है।",
          "toolId": "json-formatter"
        },
        {
          "title": "चरण 2: बेस64 एनकोडर से चेन करें",
          "description": "स्वच्छ, स्वरूपित JSON को सीधे बेस64 एनकोडर कार्यक्षेत्र में स्थानांतरित करने के लिए आउटपुट हेडर में 'बेस64 एनकोड' बटन पर क्लिक करें।",
          "toolId": "base64-encoder"
        },
        {
          "title": "चरण 3: एन्कोडेड आउटपुट की प्रतिलिपि बनाएँ",
          "description": "बेस 64 एन्कोडेड स्ट्रिंग आउटपुट ब्लॉक में तुरंत उत्पन्न होती है। इसे एक क्लिक से अपने क्लिपबोर्ड पर कॉपी करें।"
        }
      ],
      "faqs": [
        {
          "question": "क्या क्रेडेंशियल्स या कुंजियाँ प्रारूपित करना सुरक्षित है?",
          "answer": "हाँ। सभी फ़ॉर्मेटिंग और बेस64 एन्कोडिंग को आपकी मशीन पर स्थानीय रूप से निष्पादित किया जाता है, जिससे क्रेडेंशियल्स, सत्र टोकन और कुंजियों के लिए पूर्ण गोपनीयता सुनिश्चित होती है।"
        },
        {
          "question": "क्या मैं JSON को एन्कोड करने से पहले उसे छोटा भी कर सकता हूँ?",
          "answer": "हां, आप बेस 64 एनकोडर में पास करने से पहले JSON फॉर्मेटर वर्कस्पेस में 'मिनिफाई' बटन को टॉगल कर सकते हैं।"
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "HEIC को JPG में कैसे बदलें और iPhone छवियों का थोक आकार कैसे बदलें",
      "metaDescription": "Apple HEIC फ़ोटो को JPG प्रारूप में बदलें और बैच में आयामों का आकार बदलें। पूर्ण गोपनीयता के साथ तेज़, स्थानीय ब्राउज़र निष्पादन।",
      "description": "iPhone HEIC तस्वीरें उच्च गुणवत्ता वाली हैं लेकिन कई वेब पोर्टलों के साथ असंगत हैं और अक्सर साझा करने के लिए बहुत बड़ी होती हैं। ZeroWebTools एकल ब्राउज़र वर्कफ़्लो में रूपांतरण और आकार बदलने को जोड़ता है। Apple फ़ोटो को JPG में कनवर्ट करें और एक भी पिक्सेल अपलोड किए बिना बैच में उनकी चौड़ाई/ऊंचाई का आकार बदलें।",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "चरण 1: HEIC फ़ोटो अपलोड करें और कनवर्ट करें",
          "description": "अपनी HEIC फ़ाइलों को कनवर्टर में छोड़ें। JPG या PNG आउटपुट चुनें, गुणवत्ता सेटिंग्स चुनें और कनवर्ट करें।",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "चरण 2: चेन टू इमेज रिसाइज़र",
          "description": "एक बार कनवर्ट होने के बाद, नए जेनरेट किए गए जेपीईजी को सीधे बल्क इमेज रिसाइज़र वर्कस्पेस में भेजने के लिए 'बल्क रिसाइज़' चुनें।",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "चरण 3: आयामों को मापें और संपीड़ित करें",
          "description": "चौड़ाई, ऊँचाई या स्केल प्रतिशत निर्धारित करें। अपने इच्छित फ़ाइल भार को संपीड़ित करें और बैच को एक साफ़ ज़िप के रूप में डाउनलोड करें।"
        }
      ],
      "faqs": [
        {
          "question": "क्या मेरी निजी तस्वीरें आपके सर्वर पर अपलोड की गई हैं?",
          "answer": "नहीं, इमेज डिकोडिंग (HEIC) और स्केलिंग/संपीड़न को आपके डिवाइस के GPU/CPU पर स्थानीय रूप से संसाधित किया जाता है। आपकी तस्वीरें पूरी तरह सुरक्षित रहती हैं."
        },
        {
          "question": "वेब प्रदर्शन के लिए कौन सा प्रारूप सर्वोत्तम है?",
          "answer": "तेज पेज लोड और एसईओ के लिए HEIC को WEBP या संपीड़ित JPG में परिवर्तित करना और आयामों को कम करना अत्यधिक अनुशंसित है।"
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "सुरक्षित पासवर्ड कैसे बनाएं और हैश चेकसम की गणना कैसे करें",
      "metaDescription": "क्रिप्टोग्राफ़िक रूप से सुरक्षित पासवर्ड बनाएं और स्थानीय स्तर पर उनके SHA-256 हैश की गणना करें। डेटाबेस सेटअप के लिए सुरक्षित ब्राउज़र उपयोगिता।",
      "description": "सिस्टम प्रशासकों और डेवलपर्स को अक्सर डेटाबेस क्रेडेंशियल्स या उपयोगकर्ता कॉन्फ़िगरेशन के लिए यादृच्छिक, उच्च-एन्ट्रॉपी पासवर्ड उत्पन्न करने और उनके क्रिप्टोग्राफ़िक हैश चेकसम (जैसे SHA-256 या MD5) की गणना करने की आवश्यकता होती है। यह नुस्खा आपके ब्राउज़र में बिना नेटवर्क ट्रांसफ़र के इसे तुरंत करने में आपका मार्गदर्शन करता है।",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "चरण 1: एक सुरक्षित पासवर्ड बनाएं",
          "description": "एक मजबूत, यादृच्छिक पासवर्ड बनाने के लिए पासवर्ड जेनरेटर का उपयोग करें। उच्च एन्ट्रापी प्राप्त करने के लिए लंबाई, संख्या और प्रतीकों को अनुकूलित करें।",
          "toolId": "password-generator"
        },
        {
          "title": "चरण 2: हैश जेनरेटर की चेन",
          "description": "जनरेट की गई पासवर्ड स्ट्रिंग को तुरंत फ़ाइल और स्ट्रिंग हैशर कार्यक्षेत्र में पास करने के लिए 'हैश की गणना करें' का चयन करें।",
          "toolId": "file-hasher"
        },
        {
          "title": "चरण 3: एल्गोरिथम और कॉपी डाइजेस्ट का चयन करें",
          "description": "तुरंत हैश उत्पन्न करने के लिए अपना क्रिप्टोग्राफ़िक डाइजेस्ट (SHA-256, SHA-512, या MD5) चुनें। मान को अपने क्लिपबोर्ड पर कॉपी करें।"
        }
      ],
      "faqs": [
        {
          "question": "क्या पासवर्ड जनरेटर ऑनलाइन ट्रैकर्स के विरुद्ध सुरक्षित है?",
          "answer": "हां, पीढ़ी ब्राउज़र के मूल सीएसपीआरएनजी (वेब ​​क्रिप्टो एपीआई) का स्थानीय रूप से मेमोरी में उपयोग करती है, यह सुनिश्चित करती है कि कोई भी महत्वपूर्ण मान ऑनलाइन लीक न हो।"
        },
        {
          "question": "क्या मैं इस टूल से फ़ाइलें हैश कर सकता हूँ?",
          "answer": "हां, फ़ाइल हैशर कच्चे टेक्स्ट स्ट्रिंग्स (जैसे पासवर्ड) और स्थानीय रूप से अपलोड की गई भौतिक फ़ाइलों दोनों को हैशिंग का समर्थन करता है।"
        }
      ]
    }
  ],
  "it": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "Come unire e comprimere file PDF offline in una volta sola",
      "metaDescription": "Scopri come combinare più file PDF e comprimere immediatamente le dimensioni del file senza cicli di download-caricamento. 100% privato e offline.",
      "description": "La combinazione e la riduzione dei documenti PDF in genere richiede il caricamento di file su convertitori web separati, il download di un file combinato, la ridenominazione e il caricamento di nuovo per comprimerlo. ZeroWebTools semplifica tutto questo con una pipeline visiva connessa. Esegui entrambe le operazioni all'interno di un'unica scheda del browser, senza caricamenti sul server.",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "Passaggio 1: unisci i tuoi PDF",
          "description": "Apri lo strumento Unisci PDF, carica i tuoi documenti, riorganizza visivamente l'ordine delle pagine e fai clic su Unisci.",
          "toolId": "pdf-merge"
        },
        {
          "title": "Passaggio 2: microcatena da comprimere",
          "description": "Una volta uniti, invece di scaricarli, fai clic sul pulsante in linea \"Comprimi\" per passare automaticamente il documento unito direttamente all'area di lavoro di Compressor.",
          "toolId": "pdf-compress"
        },
        {
          "title": "Passaggio 3: scegli Compressione e download",
          "description": "Seleziona il livello di compressione desiderato (Bilanciato, Estremo o Senza perdita di dati) e salva il PDF ottimizzato sul tuo dispositivo."
        }
      ],
      "faqs": [
        {
          "question": "I miei file vengono caricati sul server durante questa pipeline?",
          "answer": "No. I file vengono uniti e compressi interamente nella memoria del browser utilizzando le librerie locali. Nessun dato viene inviato online."
        },
        {
          "question": "Posso anche proteggere con password il file unito?",
          "answer": "Sì, puoi continuare il concatenamento trasferendo l'output compresso nello strumento \"Proteggi PDF\" per bloccarlo con una password prima del salvataggio."
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "Come abbellire e codificare Base64 i dati JSON in modo sicuro",
      "metaDescription": "Convalida, formatta e codifica i payload JSON su Base64 con un clic. Completa privacy del browser locale per le credenziali sensibili del programmatore.",
      "description": "Gli sviluppatori spesso devono formattare payload di risposta JSON non elaborati e codificarli su Base64 per parametri di query o script di configurazione. ZeroWebTools collega questi passaggi, consentendoti di abbellire JSON non elaborato, convalidare la sintassi e codificare istantaneamente Base64 il risultato interamente lato client.",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "Passaggio 1: abbellisci JSON grezzo",
          "description": "Incolla i tuoi dati JSON grezzi o minimizzati nel formattatore. Lo strumento evidenzia chiavi, valori e segnala immediatamente eventuali errori di sintassi.",
          "toolId": "json-formatter"
        },
        {
          "title": "Passaggio 2: concatenamento all'encoder Base64",
          "description": "Fai clic sul pulsante \"Codifica Base64\" nell'intestazione dell'output per trasferire immediatamente il JSON pulito e formattato direttamente nell'area di lavoro del codificatore Base64.",
          "toolId": "base64-encoder"
        },
        {
          "title": "Passaggio 3: copiare l'output codificato",
          "description": "La stringa codificata Base64 viene generata istantaneamente nel blocco di output. Copialo negli appunti con un solo clic."
        }
      ],
      "faqs": [
        {
          "question": "È sicuro formattare credenziali o chiavi?",
          "answer": "SÌ. Tutta la formattazione e la codifica Base64 vengono eseguite localmente sul tuo computer, garantendo la completa privacy di credenziali, token di sessione e chiavi."
        },
        {
          "question": "Posso anche minimizzare il JSON prima di codificarlo?",
          "answer": "Sì, puoi attivare/disattivare il pulsante \"Minimizza\" nell'area di lavoro JSON Formatter prima di passarlo al codificatore Base64."
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "Come convertire HEIC in JPG e ridimensionare in blocco le immagini dell'iPhone",
      "metaDescription": "Converti le foto HEIC di Apple in formato JPG e ridimensiona le dimensioni in batch. Esecuzione veloce e locale del browser con completa privacy.",
      "description": "Le foto HEIC di iPhone sono di alta qualità ma incompatibili con molti portali web e spesso sono troppo grandi per essere condivise. ZeroWebTools combina conversione e ridimensionamento in un unico flusso di lavoro del browser. Converti le foto Apple in JPG e ridimensionane la larghezza/altezza in batch senza caricare un singolo pixel.",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "Passaggio 1: carica e converti foto HEIC",
          "description": "Trascina i tuoi file HEIC nel convertitore. Seleziona l'output JPG o PNG, scegli le impostazioni di qualità e converti.",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "Passaggio 2: Concatena al ridimensionatore di immagini",
          "description": "Una volta convertito, seleziona \"Ridimensiona in blocco\" per inviare i JPEG appena generati direttamente nell'area di lavoro di Bulk Image Resizer.",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "Passaggio 3: ridimensiona e comprimi le dimensioni",
          "description": "Imposta larghezza, altezza o percentuale di scala. Comprimi il file fino al peso desiderato e scarica il batch come ZIP pulito."
        }
      ],
      "faqs": [
        {
          "question": "Le mie fotografie personali vengono caricate sul tuo server?",
          "answer": "No. La decodifica dell'immagine (HEIC) e il ridimensionamento/compressione vengono elaborati localmente sulla GPU/CPU del tuo dispositivo. Le tue foto rimangono completamente al sicuro."
        },
        {
          "question": "Quale formato è migliore per le prestazioni web?",
          "answer": "La conversione da HEIC a WEBP o JPG compresso e la riduzione delle dimensioni sono altamente consigliate per caricamenti di pagina e SEO più rapidi."
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "Come generare password sicure e calcolare i checksum hash",
      "metaDescription": "Genera password crittograficamente sicure e calcola i relativi hash SHA-256 localmente. Utilità del browser sicuro per la configurazione del database.",
      "description": "Gli amministratori di sistema e gli sviluppatori hanno spesso bisogno di generare password casuali e ad alta entropia e calcolare i checksum dell'hash crittografico (come SHA-256 o MD5) per le credenziali del database o le configurazioni degli utenti. Questa ricetta ti guida a farlo istantaneamente nel tuo browser senza trasferimenti di rete.",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "Passaggio 1: crea una password sicura",
          "description": "Utilizza il generatore di password per creare una password complessa e casuale. Personalizza lunghezza, numeri e simboli per ottenere un'entropia elevata.",
          "toolId": "password-generator"
        },
        {
          "title": "Passaggio 2: catena al generatore di hash",
          "description": "Seleziona \"Calcola Hash\" per passare istantaneamente la stringa della password generata direttamente nell'area di lavoro File e String Hasher.",
          "toolId": "file-hasher"
        },
        {
          "title": "Passaggio 3: seleziona Algoritmo e Copia digest",
          "description": "Scegli il tuo digest crittografico (SHA-256, SHA-512 o MD5) per generare l'hash istantaneamente. Copia il valore negli appunti."
        }
      ],
      "faqs": [
        {
          "question": "Il generatore di password è sicuro contro i tracker online?",
          "answer": "Sì, la generazione utilizza il CSPRNG (Web Crypto API) nativo del browser localmente in memoria, garantendo che nessun valore chiave venga divulgato online."
        },
        {
          "question": "Posso eseguire l'hashing dei file con questo strumento?",
          "answer": "Sì, File Hasher supporta l'hashing sia di stringhe di testo non elaborate (come le password) che di file fisici caricati localmente."
        }
      ]
    }
  ],
  "ar": [
    {
      "slug": "merge-and-compress-pdf",
      "title": "كيفية دمج وضغط ملفات PDF دون اتصال بالإنترنت دفعة واحدة",
      "metaDescription": "تعرف على كيفية دمج ملفات PDF متعددة وضغط حجم الملف على الفور دون الحاجة إلى تكرار التنزيل والتحميل. 100% خاص وغير متصل.",
      "description": "عادةً ما يتطلب دمج مستندات PDF وتقليصها تحميل الملفات إلى محولات ويب منفصلة، ​​وتنزيل ملف مدمج، وإعادة تسميته، وتحميله مرة أخرى للضغط. تعمل ZeroWebTools على تبسيط ذلك من خلال خط أنابيب مرئي متصل. قم بإجراء كلتا العمليتين داخل علامة تبويب متصفح واحدة، دون أي تحميلات على الخادم.",
      "toolChain": [
        "pdf-merge",
        "pdf-compress"
      ],
      "steps": [
        {
          "title": "الخطوة 1: دمج ملفات PDF الخاصة بك",
          "description": "افتح أداة Merge PDF، وقم بتحميل مستنداتك، وأعد ترتيب ترتيب الصفحات بشكل مرئي، وانقر فوق Merge.",
          "toolId": "pdf-merge"
        },
        {
          "title": "الخطوة 2: Microchain للضغط",
          "description": "بمجرد الدمج، بدلاً من التنزيل، انقر فوق الزر \"ضغط\" المضمّن لتمرير المستند المدمج تلقائيًا مباشرةً إلى مساحة عمل الضاغط.",
          "toolId": "pdf-compress"
        },
        {
          "title": "الخطوة 3: اختر الضغط والتنزيل",
          "description": "حدد مستوى الضغط المطلوب (متوازن، أو شديد، أو بدون فقدان) واحفظ ملف PDF المحسّن على جهازك."
        }
      ],
      "faqs": [
        {
          "question": "هل يتم تحميل ملفاتي إلى الخادم أثناء هذا المسار؟",
          "answer": "لا، يتم دمج الملفات وضغطها بالكامل داخل ذاكرة المتصفح الخاص بك باستخدام المكتبات المحلية. لا يتم إرسال أي بيانات عبر الإنترنت."
        },
        {
          "question": "هل يمكنني أيضًا حماية الملف المدمج بكلمة مرور؟",
          "answer": "نعم، يمكنك متابعة التسلسل عن طريق تمرير الإخراج المضغوط إلى أداة \"حماية PDF\" لقفله بكلمة مرور قبل الحفظ."
        }
      ]
    },
    {
      "slug": "format-json-and-base64-encode",
      "title": "كيفية تجميل وتشفير Base64 لبيانات JSON بشكل آمن",
      "metaDescription": "التحقق من صحة حمولات JSON وتنسيقها وترميزها إلى Base64 بنقرة واحدة. أكمل خصوصية المتصفح المحلي لبيانات اعتماد المبرمج الحساسة.",
      "description": "يحتاج المطورون في كثير من الأحيان إلى تنسيق حمولات استجابة JSON الأولية وترميزها إلى Base64 لمعلمات الاستعلام أو البرامج النصية للتكوين. تربط ZeroWebTools هذه الخطوات، مما يتيح لك تجميل JSON الخام، والتحقق من صحة بناء الجملة، وترميز Base64 للنتيجة على الفور من جانب العميل بالكامل.",
      "toolChain": [
        "json-formatter",
        "base64-encoder"
      ],
      "steps": [
        {
          "title": "الخطوة 1: تجميل ملف JSON الخام",
          "description": "الصق بيانات JSON الأولية أو المصغرة في المنسق. تسلط الأداة الضوء على المفاتيح والقيم وتضع علامة على أي أخطاء في بناء الجملة على الفور.",
          "toolId": "json-formatter"
        },
        {
          "title": "الخطوة 2: السلسلة إلى برنامج التشفير Base64",
          "description": "انقر فوق الزر \"Base64 Encode\" في رأس الإخراج لنقل JSON النظيف والمنسق على الفور إلى مساحة عمل برنامج التشفير Base64.",
          "toolId": "base64-encoder"
        },
        {
          "title": "الخطوة 3: نسخ الإخراج المشفر",
          "description": "يتم إنشاء السلسلة المشفرة Base64 على الفور في كتلة الإخراج. انسخه إلى الحافظة الخاصة بك بنقرة واحدة."
        }
      ],
      "faqs": [
        {
          "question": "هل من الآمن تنسيق بيانات الاعتماد أو المفاتيح؟",
          "answer": "نعم. يتم تنفيذ جميع التنسيقات وترميز Base64 محليًا على جهازك، مما يضمن الخصوصية الكاملة لبيانات الاعتماد والرموز المميزة للجلسة والمفاتيح."
        },
        {
          "question": "هل يمكنني أيضًا تصغير JSON قبل تشفيره؟",
          "answer": "نعم، يمكنك تبديل زر \"تصغير\" في مساحة عمل JSON Formatter قبل تمريره إلى برنامج التشفير Base64."
        }
      ]
    },
    {
      "slug": "heic-to-jpg-and-resize",
      "title": "كيفية تحويل HEIC إلى JPG وتغيير حجم صور iPhone بشكل مجمّع",
      "metaDescription": "قم بتحويل صور Apple HEIC إلى تنسيق JPG وقم بتغيير حجم الأبعاد دفعة واحدة. تنفيذ متصفح محلي سريع مع خصوصية كاملة.",
      "description": "تتميز صور iPhone HEIC بجودة عالية ولكنها غير متوافقة مع العديد من بوابات الويب وغالبًا ما تكون كبيرة جدًا بحيث لا يمكن مشاركتها. تجمع ZeroWebTools بين التحويل وتغيير الحجم في سير عمل متصفح واحد. قم بتحويل صور Apple إلى JPG وقم بتغيير حجم عرضها/ارتفاعها دفعة واحدة دون تحميل بكسل واحد.",
      "toolChain": [
        "heic-to-jpg",
        "bulk-image-resizer"
      ],
      "steps": [
        {
          "title": "الخطوة 1: تحميل وتحويل صور HEIC",
          "description": "قم بإسقاط ملفات HEIC الخاصة بك في المحول. حدد إخراج JPG أو PNG، واختر إعدادات الجودة، وقم بالتحويل.",
          "toolId": "heic-to-jpg"
        },
        {
          "title": "الخطوة 2: سلسلة لتغيير حجم الصورة",
          "description": "بمجرد التحويل، حدد \"Bulk Resize\" لإرسال ملفات JPEG التي تم إنشاؤها حديثًا مباشرة إلى مساحة عمل Bulk Image Resizer.",
          "toolId": "bulk-image-resizer"
        },
        {
          "title": "الخطوة 3: قياس وضغط الأبعاد",
          "description": "قم بتعيين العرض أو الارتفاع أو النسبة المئوية للمقياس. قم بالضغط للوصول إلى وزن الملف المطلوب وقم بتنزيل الدفعة كملف ZIP نظيف."
        }
      ],
      "faqs": [
        {
          "question": "هل تم تحميل صوري الشخصية على الخادم الخاص بك؟",
          "answer": "لا، تتم معالجة فك تشفير الصورة (HEIC) وقياسها/ضغطها محليًا على وحدة معالجة الرسومات/وحدة المعالجة المركزية بجهازك. تظل صورك آمنة تمامًا."
        },
        {
          "question": "ما التنسيق الأفضل لأداء الويب؟",
          "answer": "يوصى بشدة بتحويل HEIC إلى WEBP أو JPG مضغوط وتقليص الأبعاد لتحميل الصفحات وتحسين محركات البحث بشكل أسرع."
        }
      ]
    },
    {
      "slug": "password-generate-and-hash",
      "title": "كيفية إنشاء كلمات مرور آمنة وحساب المجموع الاختباري للتجزئة",
      "metaDescription": "قم بإنشاء كلمات مرور آمنة تشفيريًا واحسب تجزئات SHA-256 الخاصة بها محليًا. أداة متصفح آمنة لإعداد قاعدة البيانات.",
      "description": "يحتاج مسؤولو النظام والمطورون في كثير من الأحيان إلى إنشاء كلمات مرور عشوائية وعالية الإنتروبيا وحساب المجموع الاختباري لتجزئة التشفير (مثل SHA-256 أو MD5) لبيانات اعتماد قاعدة البيانات أو تكوينات المستخدم. ترشدك هذه الوصفة إلى القيام بذلك على الفور في متصفحك دون الحاجة إلى عمليات نقل عبر الشبكة.",
      "toolChain": [
        "password-generator",
        "file-hasher"
      ],
      "steps": [
        {
          "title": "الخطوة 1: إنشاء كلمة مرور آمنة",
          "description": "استخدم مولد كلمة المرور لإنشاء كلمة مرور قوية وعشوائية. قم بتخصيص الطول والأرقام والرموز لتحقيق إنتروبيا عالية.",
          "toolId": "password-generator"
        },
        {
          "title": "الخطوة 2: سلسلة إلى مولد التجزئة",
          "description": "حدد \"حساب التجزئة\" لتمرير سلسلة كلمة المرور التي تم إنشاؤها على الفور مباشرةً إلى مساحة عمل File and String Hasher.",
          "toolId": "file-hasher"
        },
        {
          "title": "الخطوة 3: حدد الخوارزمية ونسخ الملخص",
          "description": "اختر ملخص التشفير الخاص بك (SHA-256، أو SHA-512، أو MD5) لإنشاء التجزئة على الفور. انسخ القيمة إلى الحافظة الخاصة بك."
        }
      ],
      "faqs": [
        {
          "question": "هل مولد كلمة المرور آمن ضد المتتبعين عبر الإنترنت؟",
          "answer": "نعم، يستخدم الجيل CSPRNG (Web Crypto API) الأصلي للمتصفح محليًا في الذاكرة، مما يضمن عدم تسرب أي قيم أساسية عبر الإنترنت."
        },
        {
          "question": "هل يمكنني تجزئة الملفات باستخدام هذه الأداة؟",
          "answer": "نعم، يدعم File Hasher تجزئة كل من السلاسل النصية الأولية (مثل كلمات المرور) والملفات الفعلية التي تم تحميلها محليًا."
        }
      ]
    }
  ]
};

export function getLocalizedRecipes(lang: string): ChainingRecipe[] {
  return RECIPES_I18N[lang] || RECIPES_I18N["en"];
}

export function getLocalizedRecipe(slug: string, lang: string): ChainingRecipe | undefined {
  const recipes = getLocalizedRecipes(lang);
  return recipes.find(r => r.slug === slug);
}
