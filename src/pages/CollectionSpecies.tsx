/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, ShieldCheck, HelpCircle } from "lucide-react";
import { collections, products } from "../data";
import { useApp } from "../context/AppContext";
import { SEO } from "../components/SEO";

export const CollectionSpecies: React.FC = () => {
  const { species } = useParams<{ species: string }>();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useApp();

  const currentCollection = collections.find((c) => c.id === species);

  if (!currentCollection) {
    return (
      <div className="pt-32 pb-24 text-center bg-[var(--color-bg-primary)] min-h-screen flex flex-col justify-center">
        <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Collection Not Located</h2>
        <p className="font-sans text-sm text-[var(--color-text-muted)] mb-8">
          The requested endangered species catalog could not be retrieved from our archives.
        </p>
        <Link to="/collections" className="underline text-[var(--color-gold)] uppercase tracking-[0.1em] text-xs">
          Return to All Collections
        </Link>
      </div>
    );
  }

  // Get products of this collection
  const collectionProducts = products.filter((p) => p.collectionId === currentCollection.id);

  return (
    <div className="pt-20 bg-[var(--color-bg-primary)]">
      <SEO
        title={currentCollection.name.toUpperCase()}
        description={`${currentCollection.statusBadge}. Discover fine jewelry named after the endangered ${currentCollection.scientificName}.`}
      />

      {/* Hero Header */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-end overflow-hidden border-b border-[var(--color-gold)]/20">
        <div className="absolute inset-0 z-0">
          <img
            src={currentCollection.heroImage}
            alt={currentCollection.name}
            className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05] saturate-[0.65]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 relative z-10 text-left">
          <div className="max-w-3xl space-y-4">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase font-medium block">
              {currentCollection.scientificName} · {currentCollection.statusBadge}
            </span>
            <h1 className="font-serif text-4.5xl md:text-7.5xl leading-none font-light uppercase tracking-wide text-[var(--color-text)] mb-2">
              {currentCollection.name.replace("The ", "")}
            </h1>
            <div className="h-[1px] bg-[var(--color-gold)] w-32 mt-6"></div>
          </div>
        </div>
      </section>

      {/* 2-Column Story Panel */}
      <section className="py-24 bg-[var(--color-bg-dark)] border-b border-[var(--color-gold)]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-gold)] block">
              The Species Chronicle
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl text-[var(--color-text)] font-light">
              Advocacy & Heritage Design
            </h2>
            <div className="font-sans text-sm md:text-base text-[var(--color-text-muted)] space-y-4 leading-[1.8] font-light">
              <p>{currentCollection.story}</p>
              <p className="font-serif italic text-lg text-[var(--color-text)] pt-2 border-l-2 border-[var(--color-gold)]/30 pl-4">
                \"We do not inherit the earth from our ancestors; we borrow it from our children.\"
              </p>
              <p>
                As part of our commitment to transparency, we publish our conservation outcomes. {currentCollection.speciesFact}
              </p>
            </div>
          </div>

          {/* Right Column: Conservation Impact Callout */}
          <div className="lg:col-span-5 flex items-center">
            <div className="bg-[var(--color-bg-primary)]/80 border border-[var(--color-gold)] p-8 md:p-10 space-y-6 text-left gold-glow">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] text-[var(--color-gold)] uppercase block mb-2 font-medium">
                Active Stewardship
              </span>
              <h3 className="font-serif text-2xl text-[var(--color-text)] font-light leading-snug">
                Your Commission at Work
              </h3>
              <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed font-light">
                {currentCollection.conservationImpact}
              </p>
              
              <div className="border-t border-[var(--color-gold)]/15 pt-6 flex items-start gap-3">
                <ShieldCheck size={20} className="text-[var(--color-gold)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-[10px] tracking-wider text-[var(--color-text)] uppercase block">
                    Certified Conservation Funding
                  </span>
                  <span className="font-sans text-[9px] text-[var(--color-text-muted)] leading-none block uppercase mt-0.5">
                    Third-party audited transfers
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Product Grid of Pieces in this specific collection */}
      <section className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="font-sans text-[0.65rem] tracking-[0.25em] text-[var(--color-gold)] uppercase block mb-1">
            Sculpted Offerings
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[var(--color-text)] uppercase font-light mb-16">
            THE WORKS OF ART
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(`/collections/${prod.collectionId}/${prod.id}`)}
                className="group relative flex flex-col justify-between bg-[var(--color-bg-dark)]/35 border border-[var(--color-gold)]/15 hover:border-[var(--color-gold)] p-3 transition-all duration-500 cursor-pointer overflow-hidden text-left"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-black">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ transitionDuration: '1000ms' }}
                    className="w-full h-full object-cover transition-transform group-hover:scale-103 filter brightness-75 contrast-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Wishlist Heart Icon */}
                  <button
                    id={`species-wish-btn-${prod.id}`}
                    aria-label="Toggle Wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-[var(--color-bg-dark)]/80 hover:bg-[var(--color-bg-dark)] rounded-full text-[var(--color-text)] hover:text-red-500 transition-colors border border-[var(--color-gold)]/20 z-10 shadow-md"
                  >
                    <Heart
                      size={14}
                      strokeWidth={1.5}
                      fill={isInWishlist(prod.id) ? "currentColor" : "none"}
                      className={isInWishlist(prod.id) ? "text-red-500" : ""}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-3 px-1 flex flex-col justify-end">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-[var(--color-text)]">
                      {prod.name}
                    </h3>
                    <p className="font-sans text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase block mt-0.5">
                      {prod.materials}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--color-gold)]/15 pt-3">
                    <span className="font-sans text-[11px] tracking-widest text-[var(--color-text)] uppercase font-light">
                      FROM ${prod.price.toLocaleString()}
                    </span>
                    <span className="font-sans text-[10px] text-[var(--color-gold)] tracking-[0.1em] hover:text-[var(--color-gold-light)] font-medium uppercase mt-0.5">
                      VIEW PIECE →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adopt a piece Callout banner */}
      <section className="py-24 bg-[#150800] border-t border-[var(--color-gold)]/20 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <span className="font-sans text-[0.65rem] tracking-[0.4em] text-[var(--color-gold)] uppercase block font-medium">
            Adopt a Habitat Project
          </span>
          <h2 className="font-serif text-3.5xl md:text-5xl text-[var(--color-text)] tracking-wider font-light uppercase leading-snug">
            Align Your Heritage With Absolute Protection
          </h2>
          <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-[1.8] max-w-xl mx-auto font-light">
            Each fine Wildcraft jewelry item of the {currentCollection.name} comes accompanied by a certified Stewardship Ledger. This ledger documents the safe deployment of conservation capital directly triggered by your purchase, registering your lifelong patronage of the {currentCollection.scientificName}'s wild territories.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact?appointment=true"
              className="border border-[var(--color-gold)] text-[var(--color-text)] py-3.5 px-8 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-bg-mid)] transition-colors inline-block w-full sm:w-auto font-medium"
            >
              BOOK A PRIVATE ASSISTANCE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
