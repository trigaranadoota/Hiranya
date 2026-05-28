/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Collection, Product, Partner, Article, Boutique } from "./types";

export const collections: Collection[] = [
  {
    id: "snow-leopard",
    name: "The Snow Leopard Collection",
    scientificName: "Panthera uncia",
    status: "VULNERABLE",
    statusBadge: "Critically Threatened Species",
    materials: "Platinum & Marquise-cut White Diamonds",
    story: "Deep in the frost-locked crags of the Himalayas, the 'Ghost of the Mountains' treads in silent beauty. Crafted with crystalline precision, this collection captures the glacial light of snow leopard habitat. Every piece features high-clarity marquise diamonds and cold platinum, mirroring the exquisite fur and majestic agility of this elusive wild cat.",
    conservationImpact: "15% of all proceeds from this collection fund Panthera's global high-altitude camera trap project and anti-poaching shepherd programs in Tajikistan and Mongolia.",
    speciesFact: "Fewer than 4,000 snow leopards remain in the wild. They are perfectly adapted to thin, icy air, using their long thick tails as thermal blankets.",
    heroImage: "https://images.unsplash.com/photo-1602491453977-ce3a371731db?w=1600&auto=format&fit=crop&q=80",
    featuredProductImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
    svgWatermark: "M10 20 L20 10 L30 20 Z" // placeholder
  },
  {
    id: "black-rhino",
    name: "The Black Rhino Collection",
    scientificName: "Diceros bicornis",
    status: "CRITICALLY ENDANGERED",
    statusBadge: "Critically Endangered Species",
    materials: "18k Heavy Yellow Gold, Emeralds & Obsidian",
    story: "Carved with the imposing architectural power of the African savanna's grand titan, the Black Rhino collection represents unwavering resilience. Heavy yellow gold bands mimic the layered hide, punctuated by raw emerald strikes and deep obsidian stones. It represents an indomitable heritage and unmatched raw elegance.",
    conservationImpact: "A portion of each sale is directly donated to Save The Elephants/Rhinos patrol teams, providing high-efficiency drone surveillance and rangers training across protected African corridors.",
    speciesFact: "Poaching for their horns is the greatest threat to Black Rhinos. With continuous defense schemes, their population is starting to make a slow and fragile recovery.",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&auto=format&fit=crop&q=80",
    featuredProductImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80",
    svgWatermark: "M40 50 Q60 30 80 50 Z"
  },
  {
    id: "pangolin",
    name: "The Pangolin Shield Collection",
    scientificName: "Manis pentadactyla",
    status: "CRITICALLY ENDANGERED",
    statusBadge: "Most Trafficked Mammal globally",
    materials: "18k Rose Gold & Chocolate Diamonds",
    story: "Inspired by the organic architecture of the pangolin's protective keratin armor, this collection features exquisite overlapping gold scales, each layered by stellar hand-craftspeople. Adorning the wearer with a golden armor shield, it symbolizes both delicate vulnerability and protective beauty.",
    conservationImpact: "Funds veterinary patrol, rehabilitation clinics, and safe-release programs run by Wildlife Alliance to intercept illegal trade routes in Southeast Asia.",
    speciesFact: "Pangolins roll into a perfect defensive sphere when threatened, which sadly makes them easy targets for traffickers. They are the only scaled mammal on Earth.",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&auto=format&fit=crop&q=80",
    featuredProductImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    svgWatermark: "M20 80 C30 50 63 43 80 80 Z"
  },
  {
    id: "bengal-tiger",
    name: "The Bengal Tiger Collection",
    scientificName: "Panthera tigris tigris",
    status: "ENDANGERED",
    statusBadge: "Apex Species Endangered",
    materials: "18k Gold, Fire Sapphires & Noir Enamelling",
    story: "The magnificent orange-gold flash running through the deep jungle. Capturing the dynamic spirit and royalty of the Bengal tiger, this collection pairs vivid fire sapphires, hand-enamelled dark stripes, and heavy liquid gold. A daring tribute to untamable strength.",
    conservationImpact: "Donated directly to tiger-corridor protection plans in India, preventing human-wildlife conflicts and maintaining vital prey-base bio-reserves.",
    speciesFact: "Under 3,900 tigers remain in the wild today. Their stripe patterns are completely unique, behaving like a human fingerprint.",
    heroImage: "https://images.unsplash.com/photo-1503066211283-f94ff1a21090?w=1600&auto=format&fit=crop&q=80",
    featuredProductImage: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
    svgWatermark: "tiger"
  },
  {
    id: "amur-leopard",
    name: "The Amur Leopard Collection",
    scientificName: "Panthera pardus orientalis",
    status: "CRITICALLY ENDANGERED",
    statusBadge: "Only ~100 Individuals Left",
    materials: "Platinum with Cognac & Rose Diamonds",
    story: "Hailing from the cold mixed temperate forests of the Russian Far East, the Amur Leopard is the rarest big cat on Earth. This collection echoes their unique widely-spaced rosette fur patterns in platinum and shimmering warm cognac diamonds, reflecting absolute rarified elegance.",
    conservationImpact: "Proceeds help fund ALTA (Amur Leopard and Tiger Alliance) monitoring protocols and winter ranger patrols to prevent forest fires in their primary winter habitat.",
    speciesFact: "With around 100 individuals remaining in the temperate forests, every newborn is a vital global miracle. They can jump up to 19 feet horizontal.",
    heroImage: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1600&auto=format&fit=crop&q=80",
    featuredProductImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80",
    svgWatermark: "amur"
  }
];

export const products: Product[] = [
  {
    id: "snow-leopard-ring",
    name: "Glacial Marquise Ring",
    collectionId: "snow-leopard",
    price: 8400,
    featured: true,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80"
    ],
    poeticDescription: "Mirroring cold starlight caught upon peak ice, a stellar tribute to the majestic Snow Leopard.",
    description: "Handcrafted in solid Platinum. A central high-integrity D-flawless marquise-cut diamond of 1.8 carats is nestled within structural ice-pave brackets that gracefully mirror the paw prints of the high-altitude hunter.",
    materials: "Platinum 950",
    stone: "Marquise-cut Flawless White Diamond (D, VVS1)",
    weight: "2.4 Carats total",
    sizing: true,
    options: {
      metals: ["Platinum 950", "18k White Gold"],
      sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"]
    }
  },
  {
    id: "snow-leopard-pendant",
    name: "Himalayan Crag Pendant",
    collectionId: "snow-leopard",
    price: 12500,
    featured: true,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80"
    ],
    poeticDescription: "A cascade of sharp, structural white ice floating against a delicate silver peak skyline.",
    description: "Suspended on a custom delicate link platinum chain. Master craftspeople layer several staggered baguette and marquise diamonds, giving a three-dimensional depth replicating glacial crests and crevices.",
    materials: "Platinum 950",
    stone: "Glacial Baguette and Marquise-cut White Diamonds",
    weight: "3.2 Carats total weight",
    sizing: false,
    options: {
      metals: ["Platinum 950"],
      sizes: ["16 inches", "18 inches", "20 inches"]
    }
  },
  {
    id: "black-rhino-signet",
    name: "Savanna Arch Signet",
    collectionId: "black-rhino",
    price: 9800,
    featured: true,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
    ],
    poeticDescription: "Bold architectural angles reflecting the sheer force and unbreakable presence of a legend.",
    description: "Sculpted in solid, heavyweight brushed 18k yellow gold. The face features a custom-faceted hand-cut deep African volcanic obsidian stone, offset by a sharp line-cut crystalline Colombian emerald, representing the rich vegetation corridors of East Africa.",
    materials: "18k Brushed Gold",
    stone: "Deep African Obsidian and Muzo Colombian Emerald (0.6ct)",
    weight: "18 grams of heavy gold",
    sizing: true,
    options: {
      metals: ["18k Yellow Gold", "18k Rose Gold"],
      sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"]
    }
  },
  {
    id: "pangolin-cuff",
    name: "Dorsal Scaled Armlet",
    collectionId: "pangolin",
    price: 18400,
    featured: true,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80"
    ],
    poeticDescription: "Overlapping organic shields in glowing rose gold, nesting warmth and eternal protection.",
    description: "A triumph of fluid armor-link metalwork. Over 42 individually cast rose gold scales are hinged with micro-precision. Each scale is inset beneath with a fine brilliant-cut brown chocolate diamond, showing light only on movement.",
    materials: "18k Rose Gold",
    stone: "Certified Conflict-Free Chocolate Fancy Diamonds",
    weight: "5.6 Carats total weight",
    sizing: false,
    options: {
      metals: ["18k Rose Gold", "18k Yellow Gold"],
      sizes: ["Small (15cm)", "Medium (17cm)", "Large (19cm)"]
    }
  },
  {
    id: "bengal-pendant",
    name: "Jungle Solitary Fire",
    collectionId: "bengal-tiger",
    price: 14200,
    featured: false,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80"],
    poeticDescription: "A sovereign amber fire burning in the deep emerald leaves.",
    description: "A highly intricate focal necklace featuring a 3.1-carat cushion-cut untreated Orange Fire Sapphire, bordered by sharp black onyx stripes and white diamonds, hung on a heavy gold link collier.",
    materials: "18k Warm Yellow Gold",
    stone: "Untreated Sri Lankan Orange Sapphire & Black Onyx",
    weight: "3.1 carat center stone, 1.4 carat diamond halo",
    sizing: false,
    options: {
      metals: ["18k Yellow Gold"],
      sizes: ["18 inches"]
    }
  },
  {
    id: "amur-earrings",
    name: "Rosette Cognac Drops",
    collectionId: "amur-leopard",
    price: 15600,
    featured: false,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80"],
    poeticDescription: "Graceful winter spots dancing in the frosted northern woodlands.",
    description: "A stunning pair of geometric drop earrings. Hand-selected sparkling cognac diamonds of impeccable gradient are paired with cold platinum lines, highlighting the rosette structures of the beautiful Amur cat.",
    materials: "Platinum 950 and 18k Gold Claws",
    stone: "Cognac, Champagne, and flawless White Diamonds",
    weight: "4.8 Carats total weight pair",
    sizing: false,
    options: {
      metals: ["Platinum & Yellow Gold Mix"],
      sizes: ["Standard Drop"]
    }
  },
  {
    id: "pangolin-ring",
    name: "Gilded Scale Ring",
    collectionId: "pangolin",
    price: 6400,
    featured: true,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80"
    ],
    poeticDescription: "A highly intimate loop of rose gold armor scales wrapping around the finger.",
    description: "An elegant, stacking-style band in 18k rose gold. Overarching polished scales overlap continuously, set with micro-pave diamonds at the tips. Extremely comfortable and tactile.",
    materials: "18k Rose Gold",
    stone: "Brilliant-cut White Diamonds (F, VVS2)",
    weight: "0.8 Carats total weight",
    sizing: true,
    options: {
      metals: ["18k Rose Gold", "18k White Gold", "Platinum"],
      sizes: ["US 5", "US 6", "US 7", "US 8", "US 9"]
    }
  },
  {
    id: "rhino-collar",
    name: "Monolithic Shield Choker",
    collectionId: "black-rhino",
    price: 26000,
    featured: true,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80", // placeholder
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80"],
    poeticDescription: "A fortress of brutalist gold collars, housing pure emerald fires.",
    description: "A masterpiece of heritage jewelry. This heavy gold torque collar holds five large, step-cut raw emeralds deep in structural bezel baskets. Each emerald weighs over 2.5 carats.",
    materials: "18k Yellow Gold",
    stone: "Certified Brazilian Step-Cut Emeralds",
    weight: "12.5 Carats total emerald weight, 45g gold",
    sizing: false,
    options: {
      metals: ["18k Heavy Yellow Gold"],
      sizes: ["14 inches", "16 inches"]
    }
  }
];

export const partners: Partner[] = [
  {
    id: "panthera",
    name: "Panthera",
    logoText: "P A N T H E R A",
    description: "The premier global conservation enterprise solely dedicated to protecting the world's 40 wild cat species. Wildcraft directly supports Panthera's Snow Leopard camera grid surveillance and range tracker collars.",
    impactNote: "Direct funding of 24 remote camera traps and 4 telemetry hunting-ranger GPS collars in Pamir peak corridors."
  },
  {
    id: "save-the-rhinos",
    name: "Rhino Protection Trust",
    logoText: "R H I N O  T R U S T",
    description: "An elite anti-poaching security enforcement and tracking team operating throughout South Africa and Namibia. They defend highly vulnerable desert black rhinos from criminal networks.",
    impactNote: "Provided 2 fixed-wing solar drone monitors and salary supplies for 6 full-time elite anti-poaching rangers."
  },
  {
    id: "wildlife-alliance",
    name: "Wildlife Alliance",
    logoText: "W I L D L I F E  A L L I A N C E",
    description: "Operating direct intercept programs in Southeast Asia to rescue highly trafficked pangolins, capture poachers, and replant crucial dense jungle canopies.",
    impactNote: "Over 180 pangolins successfully rehabilitated, surgically treated, and safely returned to protected forest sanctuaries."
  },
  {
    id: "alta",
    name: "Amur Leopard & Tiger Alliance",
    logoText: "A L T A",
    description: "A coalition of international conservation groups working hard to guarantee the survival of wild tigers and the critically endangered Amur leopards.",
    impactNote: "Funded 3 custom winter snow mobiles for rangers and community forest fire intervention kits."
  }
];

export const articles: Article[] = [
  {
    slug: "ghosts-of-the-himalayas",
    title: "Ghosts of the Himalayas: Tracking Panthera uncia",
    category: "WILDLIFE",
    author: "Elena Rostov (Lead Conservationist)",
    date: "April 14, 2026",
    excerpt: "An intimate trek through Tajikistan's high icy ridges to deploy state-of-the-art thermal imaging traps for the snow leopard.",
    content: "Our journey began at 4,000 meters above sea level, where the wind bites cold and oxygen is scarce. We were accompanied by local herders who have partnered with Panthera to become mountain guardians. Placing camera traps in this rugged landscape is an art form—we must find the natural scent-sprayed highway markers of the leopards. These camera traps have successfully captured incredible footage of three breeding mothers, giving conservationists crucial data to secure their corridors and block commercial road developments.",
    image: "https://images.unsplash.com/photo-1602491453977-ce3a371731db?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "art-of-the-pangolin-shield",
    title: "The Art of the Scale: Translating Armor to Gold",
    category: "CRAFTSMANSHIP",
    author: "Jean-Louis Dupont (Master Goldsmith)",
    date: "May 02, 2026",
    excerpt: "How our artisans spent eight months perfecting the micro-hinged gold plates that make up the breathtaking Pangolin Shield.",
    content: "When Wildcraft asked us to design a cuff that feels like a natural defense shell, we faced massive engineering challenges. How do you make 42 interlocking plates of heavy 18k rose gold feel like liquid silk on the human wrist? The secret lies in micro-hinges hidden under each shell, allowing dual-axial rotations. Each gold scale is individually polished for 4 hours to catch the sunset glow exactly, emphasizing nature's sovereign architecture.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "restoring-the-savanna-titan",
    title: "Restoring the Savanna Titan: Anti-Poaching in 2026",
    category: "CONSERVATION",
    author: "Marcus Vance (Field Director)",
    date: "March 18, 2026",
    excerpt: "Deploying high-efficiency solar drones to establish safe sanctuaries for the black rhinos.",
    content: "With continuous pressure from illegal syndicates, rangers cannot be everywhere at once. Our aerial drone security project uses automated path planning and infrared thermal cameras to scan for human activity at night near watering holes. Wildcraft's direct funding has let us double our aerial coverage, reducing local intrusion alerts by an amazing 78% this year. Together, we are creating a digital shield over the prehistoric giants of Africa.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop&q=80"
  }
];

export const boutiques: Boutique[] = [
  {
    city: "Geneva Maison",
    address: "7 Rue du Rhône, 1204 Geneva, Switzerland",
    hours: ["Monday - Friday: 10:00 - 19:00", "Saturday: 10:00 - 18:00", "Sunday: By Appointment Only"],
    phone: "+41 22 310 4400",
    email: "geneva@wildcraftjewelry.com"
  },
  {
    city: "London Salon",
    address: "24 New Bond Street, Mayfair, London W1S 2YF",
    hours: ["Monday - Saturday: 10:00 - 18:30", "Sunday: 12:00 - 17:00"],
    phone: "+44 20 7493 5000",
    email: "london@wildcraftjewelry.com"
  },
  {
    city: "New York Penthouse",
    address: "730 Fifth Avenue, Floor 18, New York, NY 10019",
    hours: ["By Appointment Only", "Monday - Saturday: 10:00 - 18:00"],
    phone: "+1 212 555 0192",
    email: "newyork@wildcraftjewelry.com"
  }
];
