/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Collection {
  id: string;
  name: string;
  scientificName: string;
  status: string;
  statusBadge: string; // e.g. "Critically Endangered"
  materials: string;
  story: string;
  conservationImpact: string;
  speciesFact: string;
  heroImage: string;
  featuredProductImage: string;
  svgWatermark: string; // SVG path or silhouette label
}

export interface Product {
  id: string;
  name: string;
  collectionId: string;
  price: number;
  featured: boolean;
  image: string;
  images: string[]; // gallery images
  description: string;
  poeticDescription: string;
  materials: string;
  stone: string;
  weight: string;
  sizing: boolean; // if adjustable sizing exists
  options?: {
    metals: string[];
    sizes: string[];
  };
}

export interface Partner {
  id: string;
  name: string;
  logoText: string;
  description: string;
  impactNote: string;
}


export interface CartItem {
  id: string; // unique identification combing color and size
  productId: string;
  quantity: number;
  metal: string;
  size: string;
}

export interface Boutique {
  city: string;
  address: string;
  hours: string[];
  phone: string;
  email: string;
}
