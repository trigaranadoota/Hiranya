/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Heart, ArrowRight, ShoppingCart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products, collections } from "../data";
import { SEO } from "../components/SEO";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, toggleWishlist, cartTotal, cartCount } = useApp();
  const navigate = useNavigate();

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)] text-left">
      <SEO title="YOUR CART BRIEFING" description="Review selected fine stewardship jewelry and prepare your secure checkout commission." />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="border-b border-[var(--color-gold)]/10 pb-6 mb-12">
          <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
            Maison Atelier
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-text)] uppercase font-light">
            SHOPPING BAG ({cartCount})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 space-y-6">
            <ShoppingCart size={40} className="text-[var(--color-gold)]/40 mx-auto" strokeWidth={1.5} />
            <h2 className="font-serif text-2.5xl text-[var(--color-text-muted)] italic">
              Your bag is currently empty.
            </h2>
            <p className="font-sans text-xs text-[var(--color-text-muted)] max-w-sm mx-auto">
              Engage with our collection catalog to discover named pieces dedicated to global conservation forces.
            </p>
            <div className="pt-4">
              <Link
                to="/collections"
                className="border border-[var(--color-gold)] text-[var(--color-text)] py-3.5 px-8 font-sans text-xs tracking-widest uppercase hover:bg-[var(--color-bg-mid)] transition-colors inline-block font-medium"
              >
                DISCOVER THE COLLECTIONS ——
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT 65%: Line Items list */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item) => {
                const prod = products.find((p) => p.id === item.productId);
                if (!prod) return null;
                const coll = collections.find((c) => c.id === prod.collectionId);

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[var(--color-bg-dark)]/40 border border-[var(--color-gold)]/15 p-4 justify-between"
                  >
                    
                    {/* Image & Main Info */}
                    <div className="flex gap-4 text-left">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-20 h-24 object-cover border border-[var(--color-gold)]/20 filter brightness-90 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <span className="font-sans text-[9px] tracking-wider text-[var(--color-gold)] uppercase block">
                          {coll?.name || "Maison Fine"}
                        </span>
                        <h3 className="font-serif text-xl text-[var(--color-text)] leading-snug font-light">
                          <Link to={`/collections/${prod.collectionId}/${prod.id}`} className="hover:text-[var(--color-gold-light)]">
                            {prod.name}
                          </Link>
                        </h3>
                        <div className="font-sans text-[10px] text-[var(--color-text-muted)] space-y-0.5 uppercase tracking-wide">
                          <span>Finish: {item.metal}</span>
                          {item.size && <span className="block">Size: {item.size}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Quantity selectors & Price */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between w-full sm:w-auto gap-8 sm:gap-12 border-t sm:border-t-0 pt-4 sm:pt-0">
                      
                      {/* Qty */}
                      <div className="flex items-center border border-[var(--color-gold)]/30">
                        <button
                          id={`qty-minus-${item.id}`}
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-xs text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-sans text-xs text-[var(--color-text)] border-x border-[var(--color-gold)]/20 bg-[var(--color-bg-dark)]">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-plus-${item.id}`}
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-xs text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <div className="font-serif text-base text-[var(--color-text)]">
                          ${(prod.price * item.quantity).toLocaleString()}
                        </div>
                        <span className="font-sans text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider block">
                          ${prod.price.toLocaleString()} each
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <button
                          id={`cart-wish-${item.productId}`}
                          aria-label="Move to Wishlist"
                          onClick={() => {
                            toggleWishlist(prod.id);
                            removeFromCart(item.id);
                          }}
                          className="text-[var(--color-text-muted)] hover:text-red-400 p-2 transition-all border border-transparent rounded-full hover:bg-black/25"
                        >
                          <Heart size={14} strokeWidth={1.5} />
                        </button>
                        <button
                          id={`cart-del-${item.id}`}
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[var(--color-text-muted)] hover:text-white p-2 transition-all border border-transparent rounded-full hover:bg-black/25"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* RIGHT 35%: Summary Card */}
            <div className="lg:col-span-4 bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/25 p-6 md:p-8 space-y-6 gold-glow text-left">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] text-[var(--color-gold)] uppercase block mb-1">
                Receipt Summary
              </span>
              <h2 className="font-serif text-2xl text-[var(--color-text)] font-light">
                Commission Estimate
              </h2>

              <div className="space-y-3 border-y border-[var(--color-gold)]/10 py-4 text-xs tracking-wider uppercase">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Subtotal</span>
                  <span className="text-[var(--color-text)] font-medium">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Courier Insured Delivery</span>
                  <span className="text-[var(--color-text)]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Steward Pledge (10%)</span>
                  <span className="text-[var(--color-gold-light)] font-medium">${(cartTotal * 0.1).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="font-serif text-lg text-[var(--color-text-muted)]">Est. Total</span>
                <span className="font-serif text-3xl text-[var(--color-gold)] font-light">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>

              <button
                id="checkout-trigger-btn"
                onClick={() => navigate("/checkout")}
                className="w-full bg-[var(--color-bg-mid)] hover:bg-[var(--color-bg-mid)]/80 text-[var(--color-text)] border border-[var(--color-gold)] font-sans text-xs tracking-[0.2em] py-4 uppercase font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                CONTINUE TO CHECKOUT <ArrowRight size={14} />
              </button>

              <p className="font-sans text-[9px] text-[var(--color-text-muted)] leading-relaxed uppercase text-center">
                10% of this transaction is automatically locked to fund endangered bio-corridors.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
