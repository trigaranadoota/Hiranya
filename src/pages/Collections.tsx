/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, SlidersHorizontal } from "lucide-react";
import { collections, products } from "../data";
import { useApp } from "../context/AppContext";
import { SEO } from "../components/SEO";

export const Collections: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleWishlist, isInWishlist } = useApp();

  // Categories include: All, Rings, Necklaces, Earrings, Bracelets & Cuffs
  const activeFilter = searchParams.get("filter") || "All";
  const activeCollection = searchParams.get("collection") || "All";

  const [visibleCount, setVisibleCount] = useState(6);

  // Filter products
  const filteredProducts = products.filter((prod) => {
    // Filter by type/category
    const matchesCategory =
      activeFilter === "All" ||
      (activeFilter === "Rings" && prod.id.includes("ring")) ||
      (activeFilter === "Necklaces" && prod.id.includes("pendant")) ||
      (activeFilter === "Earrings" && prod.id.includes("earring")) ||
      (activeFilter === "Bracelets" && (prod.id.includes("cuff") || prod.id.includes("bracelet"))) ||
      (activeFilter === "Cuffs" && prod.id.includes("cuff"));

    // Filter by species collection
    const matchesCollection = activeCollection === "All" || prod.collectionId === activeCollection;

    return matchesCategory && matchesCollection;
  });

  const handleFilterChange = (filter: string) => {
    setSearchParams((prev) => {
      if (filter === "All") {
        prev.delete("filter");
      } else {
        prev.set("filter", filter);
      }
      return prev;
    });
    setVisibleCount(6);
  };

  const handleCollectionChange = (colId: string) => {
    setSearchParams((prev) => {
      if (colId === "All") {
        prev.delete("collection");
      } else {
        prev.set("collection", colId);
      }
      return prev;
    });
    setVisibleCount(6);
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)]">
      <SEO
        title="THE JEWELRY COLLECTIONS"
        description="Browse Wildcraft's luxury fine rings, necklaces, cuffs, and earrings. Every meticulously sculpted piece funds crucial habitat restoration."
      />

      {/* Hero Banner */}
      <div className="relative py-20 md:py-32 border-b border-[var(--color-gold)]/10 text-center overflow-hidden">
        {/* Abstract giant watermark */}
        <div className="absolute inset-0 flex items-center justify-center font-serif text-[18vw] font-bold text-[var(--color-gold)]/3 uppercase leading-none select-none pointer-events-none tracking-widest">
          MAISON
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold)] block">
            The Stewardship Catalog
          </span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-wider text-[var(--color-text)] font-light leading-none">
            THE COLLECTIONS
          </h1>
          <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] max-w-lg mx-auto leading-relaxed">
            Every piece is carved by artisans, carrying the memory of a vulnerable species. 10% of your commission directly backs elite field-corridor guards.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[75px] md:top-[85px] z-30 bg-[var(--color-bg-dark)] border-b border-[var(--color-gold)]/15 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Main type filters (pills) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Cuffs"].map((f) => (
              <button
                key={f}
                id={`filter-btn-${f}`}
                onClick={() => handleFilterChange(f)}
                className={`font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-all cursor-pointer ${
                  activeFilter === f
                    ? "border-[var(--color-gold)] text-[var(--color-gold-light)] bg-[var(--color-bg-mid)]"
                    : "border-[var(--color-gold)]/20 text-[var(--color-text-muted)] hover:border-[var(--color-gold)]/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Collection Specific Filters */}
          <div className="flex items-center space-x-2 text-[11px] text-[var(--color-text-muted)]">
            <SlidersHorizontal size={12} className="text-[var(--color-gold)]" />
            <span className="font-sans uppercase tracking-[0.1em]" htmlFor="collection-select">Kingdom:</span>
            <select
              id="collection-select"
              value={activeCollection}
              onChange={(e) => handleCollectionChange(e.target.value)}
              className="bg-transparent border border-[var(--color-gold)]/25 text-[var(--color-text)] px-3 py-1.5 focus:outline-none focus:border-[var(--color-gold)] font-sans text-[10px] uppercase tracking-wider cursor-pointer font-medium"
            >
              <option value="All" className="bg-[var(--color-bg-dark)]">All Endangered Species</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id} className="bg-[var(--color-bg-dark)]">
                  {c.name.replace("The ", "")}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-[var(--color-text-muted)] italic">
                No matching pieces found in this subset.
              </p>
              <button
                id="reset-filter-btn"
                onClick={() => {
                  setSearchParams({});
                  setVisibleCount(6);
                }}
                className="mt-6 font-sans text-xs tracking-widest text-[var(--color-gold)] underline uppercase hover:text-[var(--color-gold-light)]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Product Grid - Masonry style 3 cols desktop, 2 tablet, 1 mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProducts.slice(0, visibleCount).map((prod, index) => {
                    const coll = collections.find((c) => c.id === prod.collectionId);
                    return (
                      <motion.div
                        key={prod.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                        onClick={() => navigate(`/collections/${prod.collectionId}/${prod.id}`)}
                        className="group bg-[var(--color-bg-dark)]/40 border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)] p-4 transition-all duration-500 cursor-pointer text-left flex flex-col justify-between"
                      >
                        {/* Image Frame */}
                        <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-black">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            style={{ transitionDuration: '1000ms' }}
                            className="w-full h-full object-cover transition-transform group-hover:scale-103 filter brightness-[0.8] contrast-[1.05]"
                            referrerPolicy="no-referrer"
                          />

                          {/* Red status / tag overlay on hover */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <span className="border border-[var(--color-gold)] font-sans text-[10px] tracking-[0.25em] text-[var(--color-text)] uppercase px-4 py-2 hover:bg-[var(--color-bg-mid)] transition-colors">
                              ACQUIRE DETAILS
                            </span>
                          </div>

                          {/* Wishlist Heart Icon */}
                          <button
                            id={`catalog-wish-btn-${prod.id}`}
                            aria-label="Toggle Wishlist"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(prod.id);
                            }}
                            className="absolute top-4 right-4 p-2 bg-[var(--color-bg-dark)]/80 hover:bg-[var(--color-bg-dark)] rounded-full text-[var(--color-text)] hover:text-red-500 transition-colors border border-[var(--color-gold)]/25 z-10 shadow-md"
                          >
                            <Heart
                              size={14}
                              strokeWidth={1.5}
                              fill={isInWishlist(prod.id) ? "currentColor" : "none"}
                              className={isInWishlist(prod.id) ? "text-red-500" : ""}
                            />
                          </button>
                        </div>

                        {/* Name & price */}
                        <div className="space-y-4 px-1">
                          <div>
                            <span className="font-sans text-[9px] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-1">
                              {coll?.name || "Maison Fine"}
                            </span>
                            <h2 className="font-serif text-2xl text-[var(--color-text)] leading-snug line-clamp-1">
                              {prod.name}
                            </h2>
                          </div>

                          <p className="font-serif text-sm italic text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                            {prod.poeticDescription}
                          </p>

                          <div className="flex items-center justify-between border-t border-[var(--color-gold)]/10 pt-4 mt-2">
                            <span className="font-sans text-[11px] tracking-widest text-[var(--color-text)] uppercase">
                              FROM ${prod.price.toLocaleString()}
                            </span>
                            {/* Materials note */}
                            <span className="font-sans text-[10px] text-[var(--color-text-muted)] uppercase">
                              {prod.materials.split(" ")[0]}
                            </span>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Load More Trigger */}
              {visibleCount < filteredProducts.length && (
                <div className="text-center mt-16">
                  <button
                    id="catalog-load-more"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="border border-[var(--color-gold)] text-[var(--color-text)] py-4 px-10 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-bg-mid)] hover:text-white transition-colors duration-300 font-medium cursor-pointer"
                  >
                    Load More Masterworks
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </div>
  );
};
