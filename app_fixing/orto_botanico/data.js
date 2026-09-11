const APP_DATA = {
  plants: [
    {
      id: 1,
      num: 1,
      name: "Agathis Australis",
      scientificName: "Agathis australis (D.Don) Lindl.",
      family: "Araucariaceae",
      origin: "Nuova Zelanda settentrionale",
      categoryType: "Conifera sempreverde monumentale",
      sector: "Tropicale",
      sectorKey: "tropicale",
      sectorColor: "#e6c040",
      sectorIcon: "palm",
      image: "app_assets/plants/agathis_australis.png",
      heroImage: "app_assets/plants/agathis_hero.png",
      mapCoords: { x: 50.9, y: 19.0 },
      shortSnippet: "Fossile vivente monumentale dai grandi coni legnosi",
      desc: `L'Agathis australis è una conifera sempreverde appartenente alla famiglia delle Araucariaceae, originaria della Nuova Zelanda. È una delle piante più antiche ancora viventi sul pianeta, presente già in epoche preistoriche. Può raggiungere dimensioni monumentali, superando anche i 40–50 metri di altezza. Il tronco è dritto e cilindrico, rivestito da una corteccia liscia e chiara, che tende a sfaldarsi in grandi scaglie. Le foglie sono larghe, coriacee e ovali, una caratteristica insolita per una conifera, che la rende facilmente riconoscibile.\n\nProduce coni legnosi di grandi dimensioni, contenenti semi che maturano lentamente.`,
      habitat: `In natura cresce in foreste umide subtropicali, su suoli profondi e ben drenati.\n\nNon ama ambienti secchi o gelate intense, motivo per cui negli orti botanici europei viene coltivata in ambienti protetti o particolarmente favorevoli.`,
      curiosita: [
        `È considerata un vero "fossile vivente": alcune specie del suo genere esistevano già al tempo dei dinosauri.`,
        `Il suo legno, molto pregiato, è stato utilizzato in passato per navi, templi e grandi edifici.`,
        `Gli esemplari più antichi possono vivere oltre 1.000 anni, rendendola una delle piante più longeve al mondo.`,
        `Nonostante sia una conifera, le sue foglie sembrano quelle di una pianta tropicale, sorprendente per molti visitatori.`
      ]
    },
    {
      id: 2,
      num: 2,
      name: "Cyperus Papyrus",
      scientificName: "Cyperus papyrus L.",
      family: "Cyperaceae",
      origin: "Bacino del Nilo & Sicilia orientale",
      categoryType: "Pianta palustre perenne",
      sector: "Orto Generale",
      sectorKey: "orto_generale",
      sectorColor: "#2253e7",
      sectorIcon: "bank",
      image: "app_assets/plants/cyperus_papyrus.png",
      mapCoords: { x: 90.3, y: 5.0 },
      shortSnippet: "Storico papiro acquatico con grandi infiorescenze a ombrella",
      desc: `Il Cyperus papyrus è una maestosa pianta acquatica perenne appartenente alla famiglia delle Cyperaceae. Caratterizzata da fusti verdi a sezione triangolare che possono raggiungere anche i 3-5 metri d'altezza, culmina in un'elegante infiorescenza a raggiera detta a 'ombrella'. È storicamente celeberrima per essere stata la fonte primaria della carta papiro nell'antico Egitto.`,
      habitat: `Cresce spontanea in specchi d'acqua poco profondi, rive di fiumi a corrente lenta e paludi soleggiate di climi subtropicali e mediterranei caldi. Richiede radici costantemente sommerse o terreno perennemente impregnato d'acqua.`,
      curiosita: [
        `La Sicilia è l'unico luogo in Europa dove il papiro cresce ancora spontaneo allo stato selvatico lungo le sponde del fiume Ciane a Siracusa.`,
        `Nell'antico Egitto non veniva impiegato solo per i rotoli di scrittura, ma anche per fabbricare calzature, corde, stuoie e perfino piccole imbarcazioni.`,
        `All'Orto Botanico di Catania si trova nella vasca storica monumentale dell'Orto Generale, dove ricrea l'atmosfera delle grandi oasi mediterranee.`
      ]
    },
    {
      id: 3,
      num: 3,
      name: "Cereus",
      scientificName: "Cereus repandus (L.) Mill.",
      family: "Cactaceae",
      origin: "Sud America & Caraibi",
      categoryType: "Cactus colonnare succulento",
      sector: "Arido",
      sectorKey: "arido",
      sectorColor: "#be3b3d",
      sectorIcon: "cactus",
      image: "app_assets/plants/cereus.png",
      mapCoords: { x: 21.9, y: 74.9 },
      shortSnippet: "Scultoreo cactus colonnare con fioriture notturne profumate",
      desc: `Il Cereus è uno dei generi più spettacolari e rappresentativi della famiglia delle Cactaceae. Presenta fusti colonnari eretti o ramificati con evidenti costolature longitudinali munite di areole spinose. La forma scultorea e la tonalità verde-bluastra lo rendono protagonista indiscusso della sezione arida dell'Orto.`,
      habitat: `Originario delle aree aride e semidesertiche del Sud America e delle isole caraibiche. Sopporta prolungate siccità immagazzinando enormi riserve idriche nei fusti succulenti.`,
      curiosita: [
        `I suoi magnifici fiori candidi e profumati sono notturni: si schiudono al calar del sole per attirare falene e pipistrelli, richiudendosi già alle prime luci dell'alba.`,
        `Alcuni esemplari centenari dell'Orto Botanico di Catania superano i 6 metri di altezza e producono frutti commestibili noti localmente come mele di cactus.`,
        `La disposizione a costolature agisce come una fisarmonica naturale, espandendosi quando assorbe pioggia e contraendosi durante la siccità.`
      ]
    },
    {
      id: 4,
      num: 4,
      name: "Mirto",
      scientificName: "Myrtus communis L.",
      family: "Myrtaceae",
      origin: "Bacino del Mediterraneo",
      categoryType: "Arbusto aromatico sempreverde",
      sector: "Mediterraneo",
      sectorKey: "mediterraneo",
      sectorColor: "#6750cd",
      sectorIcon: "leaf",
      image: "app_assets/plants/mirto.png",
      mapCoords: { x: 79.9, y: 89.4 },
      shortSnippet: "Simbolo della macchia mediterranea dalle bacche aromatiche",
      desc: `Il Mirto (Myrtus communis) è un elegante arbusto sempreverde aromatico, simbolo insostituibile della flora spontanea mediterranea. Le sue piccole foglie ovali emanano un profumo intenso e balsamico quando strofinate, e in autunno produce caratteristiche bacche blu-violacee ricche di tannini ed essenze naturali.`,
      habitat: `Elemento chiave della macchia mediterranea, si trova nelle garighe, coste rocciose e boschi di leccio esposti a pieno sole su substrati aridi e ben drenati.`,
      curiosita: [
        `Nell'antichità classica era la pianta sacra a Venere, simbolo di amore felice, fertilità e pace: le corone di mirto venivano donate a sposi e poeti trionfatori.`,
        `Dalle bacche e dalle foglie si ricavano per infusione idroalcolica il celebre liquore digestivo e preziosi oli essenziali impiegati in profumeria ed erboristeria.`,
        `Ha straordinarie proprietà balsamiche, antisettiche e toniche note sin dal tempo di Ippocrate.`
      ]
    },
    {
      id: 5,
      num: 5,
      name: "Carrubo",
      scientificName: "Ceratonia siliqua L.",
      family: "Fabaceae",
      origin: "Bacino del Mediterraneo & Asia Minore",
      categoryType: "Albero monumentale sempreverde",
      sector: "Orto Siculo",
      sectorKey: "orto_siculo",
      sectorColor: "#5dbc49",
      sectorIcon: "sprout",
      image: "app_assets/plants/carrubo.png",
      mapCoords: { x: 77.9, y: 22.2 },
      shortSnippet: "Albero secolare simbolo del paesaggio rurale siciliano",
      desc: `Il Carrubo (Ceratonia siliqua) è un albero maestoso a chioma espansa e fogliame coriaceo scuro, pilastro del paesaggio rurale della Sicilia sud-orientale. I suoi frutti sono lunghi baccelli pendenti detti carrube o 'vajane', ricchi di zuccheri e sostanze nutritive un tempo fondamentali per l'alimentazione contadina.`,
      habitat: `Predilige terreni calcarei e aridi dei litorali e delle colline mediterranee calde, resistendo straordinariamente ai forti venti marini e all'assenza d'acqua.`,
      curiosita: [
        `I semi del carrubo sono all'origine del termine 'carato': nell'antichità venivano usati come pesi di precisione per l'oro e le gemme data la loro straordinaria costanza di massa (~0,2 grammi).`,
        `La farina estratta dai suoi semi è un addensante naturale ampiamente utilizzato oggi nell'alta pasticceria e nella produzione del celebre cioccolato modicano.`,
        `È una pianta longeva che può superare i 500 anni di vita con tronchi monumentali e contorti di rara bellezza scenografica.`
      ]
    }
  ],

  routes: [
    {
      id: "breve",
      key: "breve",
      title: "Percorso Breve",
      subtitle: "Ideale per una prima visita panoramica",
      duration: "15-25 min",
      durationVal: "15-25 min",
      plantsCount: 4,
      badgeIcon: "footprints",
      targetText: "Ideale per <strong>famiglie</strong>, <strong>visitatori di fretta</strong> o chi vuole una prima introduzione all'Orto Botanico. Si ammirano le <strong>piante più iconiche</strong>. Un'esperienza veloce ma ricca di fascino!",
      plantListTitle: "Le piante che incontrerai:",
      plantItems: [
        { sector: "Arido", plant: "Cereus", plantId: 3, sectorColor: "#be3b3d", sectorKey: "arido" },
        { sector: "Tropicale", plant: "Agathis Australis", plantId: 1, sectorColor: "#e6c040", sectorKey: "tropicale" },
        { sector: "Orto Siculo", plant: "Carrubo", plantId: 5, sectorColor: "#5dbc49", sectorKey: "orto_siculo" },
        { sector: "Mediterraneo", plant: "Mirto", plantId: 4, sectorColor: "#6750cd", sectorKey: "mediterraneo" }
      ],
      mapImage: "app_assets/maps/map_percorso_breve.png",
      activeMapImage: "app_assets/maps/map_active_route_clean.png"
    },
    {
      id: "scoperta",
      key: "scoperta",
      title: "Percorso Scoperta",
      subtitle: "Un viaggio approfondito tra le collezioni",
      duration: "35-45 min",
      durationVal: "35 - 45 min",
      plantsCount: 8,
      badgeIcon: "sparkles",
      targetText: "Ideale per <strong>appassionati di botanica</strong>, <strong>fotografi</strong>, <strong>studenti</strong> o chi vuole una visita più immersiva senza impegnare troppo tempo. Un viaggio affascinante tra biodiversità e nuove scoperte!",
      plantListTitle: "Le piante che incontrerai:",
      plantItems: [
        { sector: "Arido", plant: "Cereus - Opuntia", plantId: 3, sectorColor: "#be3b3d", sectorKey: "arido" },
        { sector: "Tropicale", plant: "Agathis Australis - Jubaea chilensis", plantId: 1, sectorColor: "#e6c040", sectorKey: "tropicale" },
        { sector: "Orto siculo", plant: "Zelkova sicula - Carrubo - Sughera", plantId: 5, sectorColor: "#5dbc49", sectorKey: "orto_siculo" },
        { sector: "Mediterraneo", plant: "Mirto", plantId: 4, sectorColor: "#6750cd", sectorKey: "mediterraneo" }
      ],
      mapImage: "app_assets/maps/map_percorso_scoperta.png",
      activeMapImage: "app_assets/maps/map_active_route_clean.png"
    },
    {
      id: "studio",
      key: "studio",
      title: "Percorso Studio",
      subtitle: "Ricognizione scientifica completa",
      duration: "60-80 min",
      durationVal: "60-80 min",
      plantsCount: 12,
      badgeIcon: "book",
      targetText: "Ideale per <strong>ricercatori</strong>, <strong>studenti universitari</strong> e veri <strong>cultori della flora</strong> che desiderano una ricognizione esaustiva di tutti i settori storici e delle specie più rare dell'Ateneo.",
      plantListTitle: "Le piante che incontrerai:",
      plantItems: [
        { sector: "Arido", plant: "Cereus - Opuntia - Euphorbia", plantId: 3, sectorColor: "#be3b3d", sectorKey: "arido" },
        { sector: "Tropicale", plant: "Agathis Australis - Jubaea - Cycas", plantId: 1, sectorColor: "#e6c040", sectorKey: "tropicale" },
        { sector: "Orto Generale", plant: "Cyperus Papyrus - Ninfee storiche", plantId: 2, sectorColor: "#2253e7", sectorKey: "orto_generale" },
        { sector: "Orto siculo", plant: "Zelkova sicula - Carrubo - Sughera", plantId: 5, sectorColor: "#5dbc49", sectorKey: "orto_siculo" },
        { sector: "Mediterraneo", plant: "Mirto - Alloro - Quercia spinosa", plantId: 4, sectorColor: "#6750cd", sectorKey: "mediterraneo" }
      ],
      mapImage: "app_assets/maps/map_percorso_scoperta.png",
      activeMapImage: "app_assets/maps/map_active_route_clean.png"
    }
  ],

  legendItems: [
    { key: "tropicale", label: "Tropicale", color: "#e6c040", icon: "🌴", textLight: false },
    { key: "orto_generale", label: "Orto Generale", color: "#2253e7", icon: "🏛️", textLight: true },
    { key: "orto_siculo", label: "Orto Siculo", color: "#5dbc49", icon: "🍃", textLight: true },
    { key: "mediterraneo", label: "Mediterraneo", color: "#6750cd", icon: "🌿", textLight: true },
    { key: "arido", label: "Arido", color: "#be3b3d", icon: "🌵", textLight: true },
    { key: "tu_sei_qui", label: "Tu sei qui", color: "#ea3323", icon: "📍", textLight: true },
    { key: "bagni", label: "Bagni", color: "#000259", icon: "🚻", textLight: true },
    { key: "fontanella", label: "Fontanella", color: "#589fef", icon: "💧", textLight: true }
  ],

  mapMarkers: [
    { id: "start", type: "start", label: "Start", x: 94.1, y: 80.1, desc: "Punto di partenza dei percorsi guidati (Ingresso principale)" },
    { id: "end", type: "end", label: "End", x: 72.8, y: 33.5, desc: "Punto di arrivo percorso (Cortile monumentale)" },
    { id: "p1", type: "plant", plantId: 1, name: "Agathis Australis", sector: "Tropicale", sectorColor: "#e6c040", x: 50.9, y: 19.0 },
    { id: "p2", type: "plant", plantId: 2, name: "Cyperus Papyrus", sector: "Orto Generale", sectorColor: "#2253e7", x: 90.3, y: 5.0 },
    { id: "p3", type: "plant", plantId: 3, name: "Cereus", sector: "Arido", sectorColor: "#be3b3d", x: 21.9, y: 74.9 },
    { id: "p4", type: "plant", plantId: 4, name: "Mirto", sector: "Mediterraneo", sectorColor: "#6750cd", x: 79.9, y: 89.4 },
    { id: "p5", type: "plant", plantId: 5, name: "Carrubo", sector: "Orto Siculo", sectorColor: "#5dbc49", x: 77.9, y: 22.2 },
    { id: "f1", type: "fontanella", label: "Fontanella", sector: "fontanella", x: 21.9, y: 84.3, desc: "Punto acqua potabile fresca" },
    { id: "f2", type: "fontanella", label: "Fontanella", sector: "fontanella", x: 30.0, y: 12.8, desc: "Punto acqua potabile fresca" },
    { id: "b1", type: "bagni", label: "Servizi igienici", sector: "bagni", x: 7.9, y: 5.6, desc: "Servizi igienici accessibili" },
    { id: "b2", type: "bagni", label: "Servizi igienici", sector: "bagni", x: 33.8, y: 71.8, desc: "Servizi igienici accessibili" },
    { id: "you", type: "tu_sei_qui", label: "Tu sei qui", sector: "tu_sei_qui", x: 57.0, y: 97.7, desc: "Posizione attuale rilevata" }
  ]
};
