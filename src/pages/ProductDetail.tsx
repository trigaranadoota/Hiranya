/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Shield, Award, Truck, Hammer } from "lucide-react";
import { collections, products } from "../data";
import { useApp } from "../context/AppContext";
import { SEO } from "../components/SEO";

export const ProductDetail: React.FC = () => {
  const { species, product: productId } = useParams<{ species: string; product: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const currentProduct = products.find((p) => p.id === productId);
  const currentCollection = collections.find((c) => c.id === species);

  const [activeImage, setActiveImage] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("Description");
  const [addedNotifier, setAddedNotifier] = useState(false);

  // Sync state with product load
  useEffect(() => {
    if (currentProduct) {
      setActiveImage(currentProduct.image);
      if (currentProduct.options?.metals?.length) {
        setSelectedMetal(currentProduct.options.metals[0]);
      }
      if (currentProduct.options?.sizes?.length) {
        setSelectedSize(currentProduct.options.sizes[0]);
      }
    }
  }, [currentProduct]);

  if (!currentProduct || !currentCollection) {
    return (
      <div className="pt-32 pb-24 text-center bg-[var(--color-bg-primary)] min-h-screen flex flex-col justify-center">
        <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Piece Not Located</h2>
        <p className="font-sans text-sm text-[var(--color-text-muted)] mb-8">
          The requested luxury jewelry piece could not be retrieved from our archives.
        </p>
        <Link to="/collections" className="underline text-[var(--color-gold)] uppercase tracking-[0.15em] text-xs">
          Return to All Collections
        </Link>
      </div>
    );
  }

  const handleAddToBag = () => {
    addToCart(currentProduct.id, selectedMetal, selectedSize, 1);
    setAddedNotifier(true);
    setTimeout(() => setAddedNotifier(false), 3000);
  };

  // Get similar products
  const similarProducts = products
    .filter((p) => p.collectionId === currentCollection.id && p.id !== currentProduct.id)
    .slice(0, 4);

  // Tab content mapping
  const tabContents: Record<string, React.ReactNode> = {
    Description: (
      <div className="space-y-4 text-sm leading-[1.8] text-[var(--color-text-muted)] font-light text-left">
        <p>{currentProduct.description}</p>
        <div className="pt-3 grid grid-cols-2 gap-4 border-t border-[var(--color-gold)]/10 text-xs">
          <div>
            <span className="text-[var(--color-gold)] font-medium block uppercase tracking-wider mb-0.5">Specifications</span>
            <span className="block">{currentProduct.materials}</span>
          </div>
          <div>
            <span className="text-[var(--color-gold)] font-medium block uppercase tracking-wider mb-0.5">Primary Gemstone</span>
            <span className="block">{currentProduct.stone}</span>
          </div>
        </div>
      </div>
    ),
    "Conservation Story": (
      <div className="space-y-4 text-sm leading-[1.8] text-[var(--color-text-muted)] font-light text-left">
        <p>{currentCollection.story}</p>
        <p className="border-l-2 border-[var(--color-gold)]/40 pl-4 py-1 text-[var(--color-text)] italic font-serif">
          {currentCollection.conservationImpact}
        </p>
      </div>
    ),
    Craftsmanship: (
      <div className="space-y-4 text-sm leading-[1.8] text-[var(--color-text-muted)] font-light text-left">
        <p>
          Each Wildcraft artifact is custom sculpted using circular, certified Fairmined raw gold or refined platinum. Our Geneva studio integrates legacy jewelry methods dating back over three centuries.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>Individually sketched and hand-carved wax layouts</li>
          <li>Hand-selected flawless ethical gemstones with complete origin trail</li>
          <li>Micro-hinge articulation engineered for high-comfort wear</li>
        </ul>
      </div>
    ),
    "Care Guide": (
      <div className="space-y-4 text-sm leading-[1.8] text-[var(--color-text-muted)] font-light text-left">
        <p>
          Fine jewelry requires careful, deliberate handling. Avoid contact with abrasive cleaning fluids, salt water, or intense cosmetics.
        </p>
        <p>
          Clean with an ultra-soft lint-free microfiber cloth and secure in the padded velvet Wildcraft case when in transition. We offer free professional steam-cleaning and annual claw integrity checks at any salon.
        </p>
      </div>
    ),
  };

  return (
    <div className="pt-24 bg-[var(--color-bg-primary)]">
      <SEO
        title={`${currentProduct.name.toUpperCase()} - ${currentCollection.name}`}
        description={currentProduct.poeticDescription}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Breadcrumbs */}
        <div className="text-left font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-10 flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-white transition-colors">Collections</Link>
          <span>/</span>
          <Link to={`/collections/${currentCollection.id}`} className="hover:text-white transition-colors">{currentCollection.name.replace("The ", "")}</Link>
          <span>/</span>
          <span className="text-[var(--color-gold)]">{currentProduct.name}</span>
        </div>

        {/* Master PDP Layout - Left 60% Image, Right 40% Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT 60%: Image gallery with large hover-zoom and thumbnails below */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Image Frame with Hover Zoom */}
            <div className="relative aspect-[4/5] bg-black border border-[var(--color-gold)]/25 overflow-hidden group p-1.5 shadow-2xl">
              <img
                src={activeImage || currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] transition-transform duration-700 ease-out origin-center group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {currentProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`pdp-thumb-${idx}`}
                  onClick={() => setActiveImage(img)}
                  style={{ borderOffset: '2px' }}
                  className={`relative aspect-square overflow-hidden bg-black border p-0.5 transition-all duration-300 ${
                    activeImage === img
                      ? "border-[var(--color-gold)] brightness-100"
                      : "border-[var(--color-gold)]/15 brightness-60 hover:brightness-90"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Detail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT 40%: Purchase Interface */}
          <div className="lg:col-span-5 text-left space-y-8 lg:sticky lg:top-32">
            
            {/* Collection Badge & Title */}
            <div className="space-y-4">
              <div className="inline-block border border-[var(--color-gold)]/60 px-3 py-1 bg-[var(--color-bg-dark)]/50">
                <span className="font-sans text-[8px] tracking-[0.25em] text-[var(--color-gold)] uppercase font-semibold">
                  {currentCollection.name.toUpperCase()}
                </span>
              </div>
              
              <h1 className="font-serif text-3.5xl md:text-5xl text-[var(--color-text)] font-light leading-snug">
                {currentProduct.name}
              </h1>

              <div className="font-serif text-[1.4rem] text-[var(--color-gold)] font-light py-2">
                ${currentProduct.price.toLocaleString()} USD
              </div>

              <p className="font-serif text-base text-[var(--color-text-muted)] italic leading-relaxed border-l border-[var(--color-gold)]/30 pl-4 py-1">
                {currentProduct.poeticDescription}
              </p>
            </div>

            {/* Configurable Parameters */}
            <div className="space-y-6 pt-6 border-t border-[var(--color-gold)]/10">
              
              {/* Metal selector */}
              {currentProduct.options?.metals && (
                <div className="space-y-3">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] block">
                    Metal finish: <span className="text-[var(--color-text)] font-medium font-sans">{selectedMetal}</span>
                  </span>
                  <div className="flex items-center space-x-3">
                    {currentProduct.options.metals.map((m) => (
                      <button
                        key={m}
                        id={`metal-btn-${m.replace(/\s+/g, '-')}`}
                        onClick={() => setSelectedMetal(m)}
                        className={`font-sans text-[10px] tracking-[0.1em] uppercase px-4 py-2 border cursor-pointer transition-all ${
                          selectedMetal === m
                            ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-bg-dark)]"
                            : "border-[var(--color-gold)]/15 text-[var(--color-text-muted)] hover:border-[var(--color-gold)]/45"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizing selection */}
              {currentProduct.options?.sizes && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                      Sizing:
                    </span>
                    <Link
                      to="/ring-sizing"
                      className="font-sans text-[9px] tracking-[0.1em] text-[var(--color-gold)] uppercase hover:underline"
                    >
                      Ring Guide
                    </Link>
                  </div>
                  <select
                    id="size-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-[var(--color-text)] p-3 font-sans text-xs tracking-wider focus:outline-none focus:border-[var(--color-gold)] cursor-pointer"
                  >
                    {currentProduct.options.sizes.map((sz) => (
                      <option key={sz} value={sz} className="bg-[var(--color-bg-dark)]">
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            </div>

            {/* CALL TO ACTIONS */}
            <div className="space-y-4 pt-4 relative">
              
              {/* Add to Cart / Request Quote */}
              <button
                id="pdp-add-to-bag"
                onClick={handleAddToBag}
                className="w-full bg-[var(--color-bg-mid)] hover:bg-[var(--color-bg-mid)]/80 text-[var(--color-text)] border border-[var(--color-gold)] font-sans text-xs tracking-[0.25em] uppercase py-4.5 font-medium transition-colors cursor-pointer"
              >
                REQUEST DESIGN QUOTE
              </button>

              {/* Success Notification */}
              <AnimatePresence>
                {addedNotifier && (
                  <motion.div
                    className="absolute -top-12 left-0 w-full bg-[var(--color-bg-dark)] border border-[var(--color-gold)] py-2 text-center text-xs text-[var(--color-gold-light)] font-serif shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Successfully registered to your private Stewardship Enquiry.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wishlist toggle */}
              <button
                id="pdp-wish-add"
                onClick={() => toggleWishlist(currentProduct.id)}
                className={`w-full font-sans text-xs tracking-[0.2em] uppercase py-4 border text-center transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  isInWishlist(currentProduct.id)
                    ? "border-red-500 text-red-400 bg-red-950/20"
                    : "border-[var(--color-gold)]/30 text-[var(--color-text)] hover:bg-[var(--color-bg-mid)]/20"
                }`}
              >
                <Heart size={14} fill={isInWishlist(currentProduct.id) ? "currentColor" : "none"} />
                {isInWishlist(currentProduct.id) ? "WISHLISTED" : "ADD TO WISHLIST"}
              </button>

            </div>

            {/* High-end Brand Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 mt-6 border-t border-[var(--color-gold)]/10 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-[var(--color-gold)] shrink-0" />
                <span>Geneva Hallmarked</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[var(--color-gold)] shrink-0" />
                <span>Secure Courier Ship</span>
              </div>
              <div className="flex items-center gap-2">
                <Hammer size={14} className="text-[var(--color-gold)] shrink-0" />
                <span>Bespoke Adapts Available</span>
              </div>
            </div>

          </div>
        </div>

        {/* BELOW FOLD: Tabbed Details Section */}
        <section id="pdp-details-tabs" className="mt-24 border-t border-[var(--color-gold)]/15 pt-16">
          <div className="max-w-4xl mx-auto">
            {/* Headers */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 border-b border-[var(--color-gold)]/15 pb-4 mb-10">
              {Object.keys(tabContents).map((tab) => (
                <button
                  key={tab}
                  id={`tab-btn-${tab.replace(/\s+/g, '-')}`}
                  onClick={() => setActiveTab(tab)}
                  className={`font-sans text-xs md:text-sm uppercase tracking-[0.2rem] py-2 cursor-pointer transition-colors relative ${
                    activeTab === tab ? "text-[var(--color-gold)] font-medium" : "text-[var(--color-text-muted)] hover:text-white"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-gold)]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Content Frame with animate presence */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {tabContents[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* BOTTOM: You May Also Like Product Row */}
        {similarProducts.length > 0 && (
          <section id="pdp-related-pieces" className="mt-28 border-t border-[var(--color-gold)]/15 pt-20">
            <h2 className="font-serif text-3xl md:text-4.5xl text-center text-[var(--color-text)] tracking-wider uppercase mb-16">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    navigate(`/collections/${prod.collectionId}/${prod.id}`);
                    setActiveImage(""); // reset thumb syncing
                  }}
                  className="group relative flex flex-col justify-between bg-[var(--color-bg-dark)]/35 border border-[var(--color-gold)]/15 hover:border-[var(--color-gold)] p-3 transition-all duration-500 cursor-pointer overflow-hidden text-left"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ transitionDuration: '1000ms' }}
                      className="w-full h-full object-cover transition-transform group-hover:scale-103 filter brightness-75 contrast-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2 px-1">
                    <h3 className="font-serif text-lg text-[var(--color-text)] line-clamp-1">{prod.name}</h3>
                    <div className="flex items-center justify-between border-t border-[var(--color-gold)]/10 pt-2 mt-1">
                      <span className="font-sans text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                        ${prod.price.toLocaleString()}
                      </span>
                      <span className="font-sans text-[9px] text-[var(--color-gold)] tracking-widest font-medium uppercase">
                        EXPLORE →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
