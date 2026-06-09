import { Product } from "@/types";

export const categories = [
  { id: "materiel-informatique", name: "Matériel Informatique", icon: "🖥️" },
  { id: "autres", name: "Autres", icon: "📦" },
];

export const products: Product[] = [
  {
    id: "cpu-001",
    name: "Intel Core i9-14900K",
    slug: "intel-core-i9-14900k",
    category: "materiel-informatique",
    subcategory: "Intel",
    brand: "Intel",
    description: "Le processeur le plus puissant d'Intel pour les passionnés et les créateurs. Avec 24 cœurs (8 P-cores + 16 E-cores) et des fréquences allant jusqu'à 6 GHz, il offre des performances inégalées pour le gaming, le streaming et la création de contenu.",
    features: [
      "24 cœurs / 32 threads",
      "Fréquence boost jusqu'à 6.0 GHz",
      "Socket LGA1700",
      " PCIe 5.0 / 4.0",
      "DDR5-5600 / DDR4-3200 support",
      "Intel UHD Graphics 770"
    ],
    specs: {
      "Cœurs": "24 (8 P + 16 E)",
      "Threads": "32",
      "Fréquence de base": "3.2 GHz (P-core) / 2.4 GHz (E-core)",
      "Fréquence max turbo": "6.0 GHz",
      "Cache L3": "36 MB",
      "Socket": "LGA1700",
      "TDP": "125W (253W max)",
      "Support mémoire": "DDR5-5600 / DDR4-3200",
      "PCIe": "5.0 (16 lanes) + 4.0 (4 lanes)",
    },
    price: 659,
    originalPrice: 699,
    image: "https://picsum.photos/seed/cpu1/400/400",
    images: ["https://picsum.photos/seed/cpu1a/400/400", "https://picsum.photos/seed/cpu1b/400/400"],
    stock: 15,
    rating: 4.8,
    reviews: 234,
    isNew: true,
    isFeatured: true,
    createdAt: "2024-10-01"
  },
  {
    id: "cpu-002",
    name: "AMD Ryzen 9 7950X",
    slug: "amd-ryzen-9-7950x",
    category: "materiel-informatique",
    subcategory: "AMD",
    brand: "AMD",
    description: "Le fleuron d'AMD avec 16 cœurs et 32 threads. Architecture Zen 4 offrant des performances exceptionnelles en multitâche et création de contenu.",
    features: [
      "16 cœurs / 32 threads",
      "Fréquence boost jusqu'à 5.7 GHz",
      "Socket AM5",
      "PCIe 5.0 support",
      "DDR5-5200 support",
      "Architecture Zen 4"
    ],
    specs: {
      "Cœurs": "16",
      "Threads": "32",
      "Fréquence de base": "4.5 GHz",
      "Fréquence max turbo": "5.7 GHz",
      "Cache L3": "64 MB",
      "Socket": "AM5",
      "TDP": "170W",
      "Support mémoire": "DDR5-5200",
    },
    price: 589,
    image: "https://picsum.photos/seed/cpu2/400/400",
    images: ["https://picsum.photos/seed/cpu2a/400/400"],
    stock: 22,
    rating: 4.7,
    reviews: 189,
    isFeatured: true,
    createdAt: "2024-09-15"
  },
  {
    id: "gpu-001",
    name: "NVIDIA GeForce RTX 4090",
    slug: "nvidia-rtx-4090",
    category: "materiel-informatique",
    subcategory: "NVIDIA",
    brand: "NVIDIA",
    description: "La carte graphique la plus puissante au monde. Architecture Ada Lovelace, 24 Go GDDR6X, ray tracing en temps réel et DLSS 3. Parfaite pour le gaming en 4K/8K et les charges de travail IA.",
    features: [
      "24 Go GDDR6X",
      "16384 cœurs CUDA",
      "Ray Tracing 3ème génération",
      "DLSS 3 avec Frame Generation",
      "PCIe 4.0",
      "TDP 450W"
    ],
    specs: {
      "Mémoire": "24 Go GDDR6X",
      "Interface mémoire": "384-bit",
      "Cœurs CUDA": "16384",
      "Fréquence boost": "2520 MHz",
      "Ray Tracing Cores": "3ème gen (128)",
      "Tensor Cores": "4ème gen (512)",
      "TDP": "450W",
      "Sorties": "3x DP 1.4a, 1x HDMI 2.1"
    },
    price: 1899,
    originalPrice: 1999,
    image: "https://picsum.photos/seed/gpu1/400/400",
    images: ["https://picsum.photos/seed/gpu1a/400/400", "https://picsum.photos/seed/gpu1b/400/400"],
    stock: 5,
    rating: 4.9,
    reviews: 456,
    isNew: false,
    isFeatured: true,
    createdAt: "2024-08-01"
  },
  {
    id: "gpu-002",
    name: "AMD Radeon RX 7900 XTX",
    slug: "amd-rx-7900xtx",
    category: "materiel-informatique",
    subcategory: "AMD",
    brand: "AMD",
    description: "La carte graphique AMD la plus puissante. Architecture RDNA 3, 24 Go GDDR6, offrant d'excellentes performances en gaming 4K.",
    features: [
      "24 Go GDDR6",
      "6144 stream processors",
      "Ray Tracing accéléré",
      "Infinity Cache",
      "PCIe 4.0",
      "TDP 355W"
    ],
    specs: {
      "Mémoire": "24 Go GDDR6",
      "Interface mémoire": "384-bit",
      "Stream Processors": "6144",
      "Fréquence boost": "2500 MHz",
      "Infinity Cache": "96 MB",
      "TDP": "355W",
      "Sorties": "2x DP 2.1, 1x HDMI 2.1, 1x USB-C"
    },
    price: 1099,
    image: "https://picsum.photos/seed/gpu2/400/400",
    images: ["https://picsum.photos/seed/gpu2a/400/400"],
    stock: 8,
    rating: 4.6,
    reviews: 178,
    createdAt: "2024-07-15"
  },
  {
    id: "mb-001",
    name: "ASUS ROG STRIX Z790-E",
    slug: "asus-rog-strix-z790-e",
    category: "materiel-informatique",
    subcategory: "ASUS",
    brand: "ASUS",
    description: "Carte mère gaming haut de gamme socket LGA1700, chipset Z790. Wi-Fi 6E, PCIe 5.0, refroidissement optimisé.",
    features: [
      "Socket LGA1700",
      "Chipset Z790",
      "DDR5 support",
      "PCIe 5.0 x16",
      "Wi-Fi 6E + Bluetooth 5.3",
      "17+1 phases d'alimentation"
    ],
    specs: {
      "Socket": "LGA1700",
      "Chipset": "Intel Z790",
      "Format": "ATX",
      "Mémoire": "4x DDR5 (max 128 Go)",
      "PCIe": "1x PCIe 5.0 x16, 2x PCIe 4.0 x16",
      "Stockage": "5x M.2, 4x SATA 6Gb/s",
      "Wi-Fi": "Wi-Fi 6E",
      "Audio": "ROG SupremeFX 7.1"
    },
    price: 459,
    originalPrice: 499,
    image: "https://picsum.photos/seed/mb1/400/400",
    images: ["https://picsum.photos/seed/mb1a/400/400"],
    stock: 12,
    rating: 4.7,
    reviews: 145,
    isNew: true,
    createdAt: "2024-10-05"
  },
  {
    id: "mb-002",
    name: "MSI MAG X670E TOMAHAWK",
    slug: "msi-mag-x670e-tomahawk",
    category: "materiel-informatique",
    subcategory: "MSI",
    brand: "MSI",
    description: "Carte mère solide et fiable pour processeurs AMD Ryzen série 7000. Chipset X670E, PCIe 5.0, design robuste.",
    features: [
      "Socket AM5",
      "Chipset X670E",
      "DDR5 support",
      "PCIe 5.0 x16",
      "2.5G LAN",
      "14+2+1 phases d'alimentation"
    ],
    specs: {
      "Socket": "AM5",
      "Chipset": "AMD X670E",
      "Format": "ATX",
      "Mémoire": "4x DDR5 (max 192 Go)",
      "PCIe": "1x PCIe 5.0 x16, 1x PCIe 4.0 x16",
      "Stockage": "4x M.2, 6x SATA 6Gb/s",
      "LAN": "2.5Gbps",
      "Audio": "Realtek ALC4080 7.1"
    },
    price: 329,
    image: "https://picsum.photos/seed/mb2/400/400",
    images: ["https://picsum.photos/seed/mb2a/400/400"],
    stock: 18,
    rating: 4.5,
    reviews: 98,
    createdAt: "2024-06-20"
  },
  {
    id: "ram-001",
    name: "Corsair Dominator Platinum RGB 32Go DDR5",
    slug: "corsair-dominator-platinum-rgb-32go-ddr5",
    category: "materiel-informatique",
    subcategory: "DDR5",
    brand: "Corsair",
    description: "Kit mémoire haute performance 32 Go (2x16 Go) DDR5-6000 MHz. RGB personnalisable, refroidissement DHX optimisé.",
    features: [
      "32 Go (2x16 Go)",
      "DDR5-6000 MHz",
      "CL36 latence",
      "RGB personnalisable",
      "Intel XMP 3.0",
      "AMD EXPO support"
    ],
    specs: {
      "Capacité": "32 Go (2x16 Go)",
      "Type": "DDR5",
      "Fréquence": "6000 MHz",
      "Latence CAS": "CL36",
      "Tension": "1.35V",
      "Format": "DIMM",
      "Radiateur": "Aluminium anodisé"
    },
    price: 159,
    originalPrice: 179,
    image: "https://picsum.photos/seed/ram1/400/400",
    images: ["https://picsum.photos/seed/ram1a/400/400"],
    stock: 30,
    rating: 4.8,
    reviews: 312,
    isFeatured: true,
    createdAt: "2024-09-01"
  },
  {
    id: "ram-002",
    name: "G.Skill Trident Z5 Neo 64Go DDR5",
    slug: "gskill-trident-z5-neo-64go-ddr5",
    category: "materiel-informatique",
    subcategory: "DDR5",
    brand: "G.Skill",
    description: "Kit mémoire 64 Go (2x32 Go) DDR5-5600 MHz. Excellence performance pour les stations de travail et le gaming.",
    features: [
      "64 Go (2x32 Go)",
      "DDR5-5600 MHz",
      "CL40 latence",
      "Design néon élégant",
      "AMD EXPO certifié",
      "Construction premium"
    ],
    specs: {
      "Capacité": "64 Go (2x32 Go)",
      "Type": "DDR5",
      "Fréquence": "5600 MHz",
      "Latence CAS": "CL40",
      "Tension": "1.25V",
      "Format": "DIMM"
    },
    price: 239,
    image: "https://picsum.photos/seed/ram2/400/400",
    images: ["https://picsum.photos/seed/ram2a/400/400"],
    stock: 20,
    rating: 4.6,
    reviews: 87,
    createdAt: "2024-08-10"
  },
  {
    id: "ssd-001",
    name: "Samsung 990 Pro 2To NVMe",
    slug: "samsung-990-pro-2to-nvme",
    category: "materiel-informatique",
    subcategory: "SSD NVMe",
    brand: "Samsung",
    description: "SSD NVMe PCIe 4.0 ultra-rapide. 2 To de stockage avec des vitesses de lecture/écriture exceptionnelles.",
    features: [
      "2 To capacité",
      "PCIe 4.0 NVMe M.2",
      "Lecture 7450 Mo/s",
      "Écriture 6900 Mo/s",
      "Samsung V-NAND",
      "5 ans garantie"
    ],
    specs: {
      "Capacité": "2 To",
      "Interface": "PCIe 4.0 x4 NVMe",
      "Format": "M.2 2280",
      "Lecture séquentielle": "7450 Mo/s",
      "Écriture séquentielle": "6900 Mo/s",
      "TBW": "1200 TB",
      "NAND": "Samsung V-NAND 3-bit MLC"
    },
    price: 219,
    originalPrice: 249,
    image: "https://picsum.photos/seed/ssd1/400/400",
    images: ["https://picsum.photos/seed/ssd1a/400/400"],
    stock: 25,
    rating: 4.9,
    reviews: 423,
    isNew: true,
    isFeatured: true,
    createdAt: "2024-10-10"
  },
  {
    id: "ssd-002",
    name: "Western Digital Black SN850X 1To",
    slug: "wd-black-sn850x-1to",
    category: "materiel-informatique",
    subcategory: "SSD NVMe",
    brand: "Western Digital",
    description: "SSD gaming haute performance 1 To NVMe PCIe 4.0. Game Mode optimisé pour des performances maximales.",
    features: [
      "1 To capacité",
      "PCIe 4.0 NVMe M.2",
      "Lecture 7300 Mo/s",
      "Écriture 6300 Mo/s",
      "Game Mode 2.0",
      "5 ans garantie"
    ],
    specs: {
      "Capacité": "1 To",
      "Interface": "PCIe 4.0 x4 NVMe",
      "Format": "M.2 2280",
      "Lecture séquentielle": "7300 Mo/s",
      "Écriture séquentielle": "6300 Mo/s",
      "TBW": "600 TB"
    },
    price: 129,
    image: "https://picsum.photos/seed/ssd2/400/400",
    images: ["https://picsum.photos/seed/ssd2a/400/400"],
    stock: 35,
    rating: 4.7,
    reviews: 267,
    createdAt: "2024-07-01"
  },
  {
    id: "psu-001",
    name: "Corsair RM850x Shift 850W",
    slug: "corsair-rm850x-shift-850w",
    category: "materiel-informatique",
    subcategory: "Modulaire",
    brand: "Corsair",
    description: "Alimentation modulaire 80+ Gold, 850W. Design Shift avec connecteurs latéraux pour un câble management facile.",
    features: [
      "850W 80+ Gold",
      "Modulaire (type Shift)",
      "Connecteurs latéraux innovants",
      "Ventilateur 135mm PWM",
      "Condensateurs japonais",
      "10 ans garantie"
    ],
    specs: {
      "Puissance": "850W",
      "Certification": "80+ Gold",
      "Modularité": "Complètement modulaire",
      "Ventilateur": "135mm PWM",
      "Protections": "OVP/UVP/SCP/OCP/OTP",
      "ATX Version": "ATX 3.0",
      "Garantie": "10 ans"
    },
    price: 159,
    image: "https://picsum.photos/seed/psu1/400/400",
    images: ["https://picsum.photos/seed/psu1a/400/400"],
    stock: 18,
    rating: 4.6,
    reviews: 134,
    isNew: true,
    createdAt: "2024-09-20"
  },
  {
    id: "case-001",
    name: "NZXT H7 Flow",
    slug: "nzxt-h7-flow",
    category: "materiel-informatique",
    subcategory: "Moyen Tour",
    brand: "NZXT",
    description: "Boîtier moyen tour avec flux d'air optimisé. Panneau avant en mesh, support des radiateurs jusqu'à 360mm.",
    features: [
      "Format moyen tour",
      "Panneau avant mesh",
      "Support GPU vertical",
      "Radiateur 360mm compatible",
      "Panneau latéral trempé",
      "Hub USB-C intégré"
    ],
    specs: {
      "Format": "Moyen Tour",
      "Type carte mère": "ATX / mATX / ITX",
      "GPU max": "400mm",
      "Ventilateur CPU max": "185mm",
      "PSU max": "200mm",
      "Ventilateurs inclus": "2x 120mm Aer F",
      "USB": "1x USB-C 3.2, 2x USB-A 3.2"
    },
    price: 129,
    originalPrice: 149,
    image: "https://picsum.photos/seed/case1/400/400",
    images: ["https://picsum.photos/seed/case1a/400/400"],
    stock: 10,
    rating: 4.5,
    reviews: 89,
    createdAt: "2024-06-15"
  },
  {
    id: "cool-001",
    name: "Noctua NH-D15 chromax.black",
    slug: "noctua-nh-d15-chromax-black",
    category: "materiel-informatique",
    subcategory: "Air",
    brand: "Noctua",
    description: "Le meilleur refroidisseur CPU air du marché. Double tour, double ventilateur NF-A15, version chromax.black élégante.",
    features: [
      "Double tour",
      "2x NF-A15 140mm PWM",
      "Version chromax.black",
      "Compatible LGA1700/AM5",
      "6 caloducs cuivre nickelé",
      "Silencieux (24.6 dB max)"
    ],
    specs: {
      "Type": "Refroidisseur air",
      "Ventilateurs": "2x 140mm NF-A15 PWM",
      "Caloducs": "6 (cuivre nickelé)",
      "Base": "Cuivre nickelé",
      "TDP max": "250W+",
      "Bruit": "24.6 dB(A) max",
      "Compatibilité": "LGA1700/1200/115x, AM5/AM4"
    },
    price: 109,
    image: "https://picsum.photos/seed/cool1/400/400",
    images: ["https://picsum.photos/seed/cool1a/400/400"],
    stock: 14,
    rating: 4.9,
    reviews: 567,
    isFeatured: true,
    createdAt: "2024-05-01"
  },
  {
    id: "cool-002",
    name: "Corsair iCUE H150i Elite Capellix XT",
    slug: "corsair-icue-h150i-elite-capellix-xt",
    category: "materiel-informatique",
    subcategory: "AIO",
    brand: "Corsair",
    description: "Watercooling AIO 360mm avec RGB Capellix et écran LCD personnalisable. Performances de refroidissement exceptionnelles.",
    features: [
      "Radiateur 360mm",
      "Pompe Capellix RGB",
      "Écran LCD personnalisable",
      "3x ML120 RGB",
      "iCUE compatible",
      "5 ans garantie"
    ],
    specs: {
      "Type": "AIO Liquid Cooling",
      "Taille radiateur": "360mm",
      "Ventilateurs": "3x 120mm ML RGB",
      "Pompe": "Capellix avec LCD",
      "TDP max": "350W+",
      "Bruit": "30 dB(A) max",
      "Compatibilité": "LGA1700/1200/115x, AM5/AM4"
    },
    price: 219,
    originalPrice: 249,
    image: "https://picsum.photos/seed/cool2/400/400",
    images: ["https://picsum.photos/seed/cool2a/400/400"],
    stock: 7,
    rating: 4.7,
    reviews: 198,
    isNew: true,
    createdAt: "2024-10-01"
  },
  {
    id: "periph-001",
    name: "Logitech G Pro X Superlight 2",
    slug: "logitech-g-pro-x-superlight-2",
    category: "autres",
    subcategory: "Souris",
    brand: "Logitech",
    description: "Souris gaming sans fil ultra-légère (60g). Capteur HERO 2, 32000 DPI, 5 boutons programmables.",
    features: [
      "Poids 60g",
      "Capteur HERO 2",
      "32000 DPI",
      "Sans fil LIGHTSPEED",
      "5 boutons programmables",
      "Batterie 95h"
    ],
    specs: {
      "Poids": "60g",
      "Capteur": "HERO 2",
      "DPI max": "32000",
      "Connexion": "LIGHTSPEED / USB-C",
      "Boutons": "5 programmables",
      "Autonomie": "95 heures",
      "Compatibilité": "PC / Mac"
    },
    price: 159,
    image: "https://picsum.photos/seed/periph1/400/400",
    images: ["https://picsum.photos/seed/periph1a/400/400"],
    stock: 40,
    rating: 4.8,
    reviews: 678,
    isFeatured: true,
    createdAt: "2024-09-10"
  },
  {
    id: "periph-002",
    name: "SteelSeries Apex Pro TKL",
    slug: "steelseries-apex-pro-tkl",
    category: "autres",
    subcategory: "Claviers",
    brand: "SteelSeries",
    description: "Clavier gaming mécanique TKL avec switches magnétiques OmniPoint 2.0 réglables. Actuation ajustable de 0.1 à 4.0mm.",
    features: [
      "Switches OmniPoint 2.0",
      "Actuation réglable 0.1-4.0mm",
      "Format TKL",
      "OLED écran",
      "RGB par touche",
      "Repose-poignet magnétique"
    ],
    specs: {
      "Type": "Mécanique TKL",
      "Switches": "OmniPoint 2.0 magnétique",
      "Actuation": "0.1 - 4.0mm réglable",
      "Rétroéclairage": "RGB par touche",
      "Connexion": "USB-C détachable",
      "Mémoire": "Intégrée (5 profils)",
      "Touche": "PBT doubleshot"
    },
    price: 219,
    originalPrice: 249,
    image: "https://picsum.photos/seed/periph2/400/400",
    images: ["https://picsum.photos/seed/periph2a/400/400"],
    stock: 22,
    rating: 4.7,
    reviews: 345,
    isNew: true,
    createdAt: "2024-10-12"
  },
  {
    id: "periph-003",
    name: "Bose QuietComfort Ultra",
    slug: "bose-quietcomfort-ultra",
    category: "autres",
    subcategory: "Audio",
    brand: "Bose",
    description: "Casque audio sans fil avec réduction de bruit active. Son immersif spatial, batterie 24h, confort exceptionnel.",
    features: [
      "Réduction de bruit active",
      "Son spatial immersif",
      "Batterie 24h",
      "Bluetooth 5.3",
      "CustomTune technologie",
      "Plage pliable"
    ],
    specs: {
      "Type": "Casque circum-aural",
      "Réduction de bruit": "Active (CustomTune)",
      "Son": "Spatial avec suivi de tête",
      "Connexion": "Bluetooth 5.3 / USB-C / Jack 3.5mm",
      "Autonomie": "24 heures",
      "Charge rapide": "15min = 2.5h",
      "Poids": "250g"
    },
    price: 399,
    image: "https://picsum.photos/seed/periph3/400/400",
    images: ["https://picsum.photos/seed/periph3a/400/400"],
    stock: 16,
    rating: 4.8,
    reviews: 234,
    isNew: true,
    createdAt: "2024-10-15"
  },
  {
    id: "periph-004",
    name: "Samsung Odyssey G7 32\" 4K 144Hz",
    slug: "samsung-odyssey-g7-32-4k",
    category: "autres",
    subcategory: "Écrans",
    brand: "Samsung",
    description: "Moniteur gaming 32 pouces 4K UHD, 144Hz, 1ms. HDR600, courbure 1000R, G-Sync compatible.",
    features: [
      "32 pouces 4K UHD",
      "144Hz / 1ms",
      "HDR600",
      "Courbure 1000R",
      "G-Sync compatible",
      "1x HDMI 2.1, 2x DP 1.4"
    ],
    specs: {
      "Taille": "32 pouces",
      "Résolution": "3840 x 2160 (4K UHD)",
      "Taux rafraîchissement": "144Hz",
      "Temps réponse": "1ms GtG",
      "HDR": "HDR600",
      "Courbure": "1000R",
      "Connectivité": "1x HDMI 2.1, 2x DP 1.4, 2x USB-A"
    },
    price: 599,
    originalPrice: 699,
    image: "https://picsum.photos/seed/periph4/400/400",
    images: ["https://picsum.photos/seed/periph4a/400/400", "https://picsum.photos/seed/periph4b/400/400"],
    stock: 9,
    rating: 4.6,
    reviews: 156,
    isFeatured: true,
    createdAt: "2024-08-20"
  },
  {
    id: "psu-002",
    name: "be quiet! Dark Power 13 1000W",
    slug: "be-quiet-dark-power-13-1000w",
    category: "materiel-informatique",
    subcategory: "Modulaire",
    brand: "be quiet!",
    description: "Alimentation 1000W 80+ Titanium, modulaire, ultra-silencieuse. ATX 3.0, PCIe 5.0 prête.",
    features: [
      "1000W 80+ Titanium",
      "ATX 3.0 / PCIe 5.0",
      "Fonctionnement silencieux",
      "Modulaire complet",
      "Condensateurs japonais",
      "10 ans garantie"
    ],
    specs: {
      "Puissance": "1000W",
      "Certification": "80+ Titanium",
      "Modularité": "Complètement modulaire",
      "Ventilateur": "135mm Silent Wings 4",
      "ATX Version": "3.0",
      "Protections": "OVP/UVP/SCP/OCP/OTP/OPP",
      "Garantie": "10 ans"
    },
    price: 279,
    image: "https://picsum.photos/seed/psu2/400/400",
    images: ["https://picsum.photos/seed/psu2a/400/400"],
    stock: 11,
    rating: 4.8,
    reviews: 89,
    isNew: true,
    createdAt: "2024-10-08"
  },
  {
    id: "case-002",
    name: "Lian Li O11 Dynamic EVO",
    slug: "lian-li-o11-dynamic-evo",
    category: "materiel-informatique",
    subcategory: "Moyen Tour",
    brand: "Lian Li",
    description: "Boîtier moyen tour premium avec panneaux en verre trempé. Design modulaire, support de montage vertical GPU, flux d'air exceptionnel.",
    features: [
      "Panneaux verre trempé",
      "Montage GPU vertical",
      "Support 3x 360mm radiateur",
      "Design modulaire",
      "Hub USB-C 3.2",
      "Sans vis (tool-less)"
    ],
    specs: {
      "Format": "Moyen Tour",
      "Type carte mère": "ATX / mATX / ITX",
      "GPU max": "420mm",
      "Radiateur": "360mm haut/côté/bas",
      "Ventilateurs max": "10x 120mm ou 5x 140mm",
      "Stockage": "2x 3.5\", 4x 2.5\""
    },
    price: 179,
    image: "https://picsum.photos/seed/case2/400/400",
    images: ["https://picsum.photos/seed/case2a/400/400"],
    stock: 13,
    rating: 4.7,
    reviews: 234,
    createdAt: "2024-07-01"
  },
  {
    id: "cpu-003",
    name: "Intel Core i5-14600K",
    slug: "intel-core-i5-14600k",
    category: "materiel-informatique",
    subcategory: "Intel",
    brand: "Intel",
    description: "Le meilleur rapport qualité-prix pour le gaming. 14 cœurs hybrides, fréquences élevées, performances solides.",
    features: [
      "14 cœurs (6P + 8E)",
      "20 threads",
      "Fréquence boost 5.3 GHz",
      "Socket LGA1700",
      "DDR5 / DDR4 support",
      "Intel UHD Graphics 770"
    ],
    specs: {
      "Cœurs": "14 (6 P + 8 E)",
      "Threads": "20",
      "Fréquence de base": "3.5 GHz (P-core)",
      "Fréquence max turbo": "5.3 GHz",
      "Cache L3": "24 MB",
      "Socket": "LGA1700",
      "TDP": "125W (181W max)"
    },
    price: 319,
    originalPrice: 349,
    image: "https://picsum.photos/seed/cpu3/400/400",
    images: ["https://picsum.photos/seed/cpu3a/400/400"],
    stock: 28,
    rating: 4.7,
    reviews: 345,
    isFeatured: true,
    createdAt: "2024-09-01"
  },
  {
    id: "gpu-003",
    name: "NVIDIA GeForce RTX 4070 Super",
    slug: "nvidia-rtx-4070-super",
    category: "materiel-informatique",
    subcategory: "NVIDIA",
    brand: "NVIDIA",
    description: "La carte graphique idéale pour le gaming 1440p. 12 Go GDDR6X, DLSS 3, ray tracing, excellente efficacité énergétique.",
    features: [
      "12 Go GDDR6X",
      "7168 cœurs CUDA",
      "DLSS 3.0",
      "Ray Tracing",
      "PCIe 4.0",
      "TDP 220W"
    ],
    specs: {
      "Mémoire": "12 Go GDDR6X",
      "Interface mémoire": "192-bit",
      "Cœurs CUDA": "7168",
      "Fréquence boost": "2475 MHz",
      "TDP": "220W",
      "Sorties": "3x DP 1.4a, 1x HDMI 2.1"
    },
    price: 599,
    image: "https://picsum.photos/seed/gpu3/400/400",
    images: ["https://picsum.photos/seed/gpu3a/400/400"],
    stock: 20,
    rating: 4.7,
    reviews: 189,
    isNew: true,
    createdAt: "2024-10-20"
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: false,
  }).format(price) + " DH";
}
