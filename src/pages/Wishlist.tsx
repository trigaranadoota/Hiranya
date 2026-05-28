/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products, collections } from "../data";
import { SEO } from "../components/SEO";

export const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const navigate = useNavigate();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((p) => {
      const metal = p.options?.metals?.[0] || "Standard Platinum";
      const size = p.options?.sizes?.[0] || "Standard Size";
      addToCart(p.id, metal, size, 1);
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)] text-left">
      <SEO title="YOUR MAISON WISHLIST" description="Review your designated fine jewelry wishlists ahead of commission request briefings." />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-[var(--color-gold)]/10 pb-6 mb-12 gap-4">
          <div>
            <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
              Private Archives
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl text-white uppercase font-light">
              YOUR WISHLIST ({wishlist.length})
            </h1>
          </div>

          {wishlistProducts.length > 0 && (
            <button
              id="wishlist-add-all-btn"
              onClick={handleAddAllToCart}
              className="border border-[var(--color-gold)] text-[var(--color-text)] py-3 px-6 font-sans text-xs tracking-widest uppercase hover:bg-[var(--color-bg-mid)] transition-colors cursor-pointer"
            >
              ADD ALL PIECES TO BAG
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24 space-y-6">
            <Heart size={40} className="text-[var(--color-gold)]/30 mx-auto" strokeWidth={1.5} />
            <h2 className="font-serif text-2.5xl text-[var(--color-text-muted)] italic">
              Your wishlist stands empty.
            </h2>
            <p className="font-sans text-xs text-[var(--color-text-muted)] max-w-sm mx-auto leading-relaxed">
              Log private designs to review later, or book a boutique salon session to consult options.
            </p>
            <div className="pt-4">
              <Link
                to="/collections"
                className="border border-[var(--color-gold)] text-white font-sans text-xs tracking-widest uppercase py-3.5 px-8 hover:bg-[var(--color-bg-mid)] transition-colors inline-block"
              >
                BROWSE OFF-CENTER CATALOG ——
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((prod) => {
              const coll = collections.find((c) => c.id === prod.collectionId);
              return (
                <div
                  key={prod.id}
                  className="group relative bg-[var(--color-bg-dark)]/40 border border-[var(--color-gold)]/15 p-3 flex flex-col justify-between"
                >
                  {/* Image and Trash */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-black">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ transitionDuration: '1000ms' }}
                      className="w-full h-full object-cover transition-transform group-hover:scale-103 filter brightness-75 contrast-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Delete from wishlist button */}
                    <button
                      id={`wishlist-del-btn-${prod.id}`}
                      aria-label="Remove from Wishlist"
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-4 right-4 p-2 bg-[var(--color-bg-dark)]/90 hover:bg-black rounded-full text-[var(--color-text-muted)] hover:text-red-400 border border-[var(--color-gold)]/20 shadow-md"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="space-y-3 px-1">
                    <div className="text-left space-y-0.5">
                      <span className="font-sans text-[8px] tracking-[0.2em] text-[var(--color-gold)] uppercase block">
                        {coll?.name.replace("The ", "") || "Maison Fine"}
                      </span>
                      <h3 className="font-serif text-lg text-white font-light line-clamp-1">
                        {prod.name}
                      </h3>
                      <span className="font-serif text-[13px] text-white block">
                        ${prod.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Actions bar */}
                    <div className="grid grid-cols-2 gap-2 border-t border-[var(--color-gold)]/10 pt-3 text-[9px] uppercase tracking-wider font-sans">
                      <button
                        id={`wishlist-pdp-nav-btn-${prod.id}`}
                        onClick={() => navigate(`/collections/${prod.collectionId}/${prod.id}`)}
                        className="py-2 border border-[var(--color-gold)]/20 text-white text-center flex items-center justify-center gap-1.5 hover:border-[var(--color-gold)]"
                      >
                        <Eye size={12} /> VIEW
                      </button>
                      <button
                        id={`wishlist-bag-btn-${prod.id}`}
                        onClick={() => {
                          const metal = prod.options?.metals?.[0] || "Platinum 950";
                          const size = prod.options?.sizes?.[0] || "US 7";
                          addToCart(prod.id, metal, size, 1);
                        }}
                        className="py-2 bg-[var(--color-bg-mid)] text-white text-center flex items-center justify-center gap-1.5 hover:bg-[var(--color-bg-mid)]/80"
                      >
                        <ShoppingBag size={12} /> BAG
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
