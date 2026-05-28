/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Award, Hammer, Compass, Feather } from "lucide-react";
import { SEO } from "../components/SEO";

interface Artisan {
  id: string;
  name: string;
  role: string;
  years: number;
  bio: string;
  image: string;
}

const artisans: Artisan[] = [
  { id: "jean-louis", name: "Jean-Louis Dupont", role: "Master Goldsmith", years: 28, bio: "Jean-Louis manages our high-jewelry sculpting bench in Geneva. His unique ability to render microscopic, dual-axis hinges in heavy circular gold brings the Pangolin Shield to life.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80" },
  { id: "elena", name: "Elena Varghese", role: "Lead Diamond Cutter", years: 19, bio: "Elena executes meticulous marquise cuts with flawless facial orientations. Every White Diamond that leaves her bench mirrors Himalayan glacial starlight.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80" },
  { id: "marcus", name: "Marcus Vance", role: "Casting Director", years: 14, bio: "Overseeing the pure thermal alloy pours of Fairmined fine materials. Marcus guarantees zero slag or mercury leaks exist within HIRANYA inputs.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80" }
];

export const HouseStory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get("view") || "story";
  const [activeTab, setActiveTab] = useState(initialView);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "story" || view === "craftspeople") {
      setActiveTab(view);
    }
  }, [searchParams]);

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)]">
      <SEO
        title={activeTab === "story" ? "OUR LEGACY STORY" : "THE MAISON CRAFTSPEOPLE"}
        description="Discover the history of HIRANYA, from inception to supporting species preservation. Learn about the Geneva artisans sculpting our collections."
      />

      {/* Hero */}
      <div className="relative border-b border-[var(--color-gold)]/10 py-16 text-center bg-[var(--color-bg-dark)]">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold)] block">
            Inside the Atelier
          </span>
          <h1 className="font-serif text-4.5xl md:text-6.5xl text-[var(--color-text)] uppercase font-light leading-none">
            {activeTab === "story" ? "THE HOUSE STORY" : "THE ARTISANS"}
          </h1>

          <div className="flex items-center justify-center space-x-6 pt-4">
            <button
              id="house-btn-story"
              onClick={() => setActiveTab("story")}
              className={`font-sans text-xs tracking-[0.2em] uppercase pb-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "story" ? "border-[var(--color-gold)] text-[var(--color-gold)]" : "border-transparent text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              Our Legacy Story
            </button>
            <button
              id="house-btn-crafts"
              onClick={() => setActiveTab("craftspeople")}
              className={`font-sans text-xs tracking-[0.2em] uppercase pb-2 border-b-2 cursor-pointer transition-colors ${
                activeTab === "craftspeople" ? "border-[var(--color-gold)] text-[var(--color-gold)]" : "border-transparent text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              The Craftspeople
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "story" ? (
          /* EDITORIAL LONG-FORM STORY */
          <motion.div
            key="story-content"
            className="space-y-24 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Block 1 */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[25rem] md:h-[35rem] w-full border border-[var(--color-gold)]/20 p-2">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80"
                  alt="Workshop draft table"
                  className="w-full h-full object-cover filter brightness-[0.7] saturate-[0.6]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left space-y-6 max-w-xl">
                <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block">
                  Chapter I — The Inception
                </span>
                <h2 className="font-serif text-3.5xl md:text-5xl text-[var(--color-text)] font-light">
                  A Sovereign Alignment
                </h2>
                <div className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-[1.8] space-y-4 font-light">
                  <p>
                    Established under the cold wind of Geneva, Swiss Alps, HIRANYA was born from a singular conviction: that absolute visual luxury should not exist in isolation from the biosphere. We observed high-end jewelry honoring abstract models, while the natural architectures that inspire them faced continuous trespass and extinction.
                  </p>
                  <p>
                    By allocating a sovereign 10% pledge of our total commissions directly to certified wildlife field operations, we turn fine accessories into critical, long-standing defense tokens for endangered wild cat ranges, titan rhino corridors, and pangolin shelters.
                  </p>
                </div>
              </div>
            </div>

            {/* Giant Pullquote */}
            <div className="bg-[var(--color-bg-dark)] py-20 border-y border-[var(--color-gold)]/10 text-center">
              <div className="max-w-3xl mx-auto px-6 space-y-4">
                <p className="font-serif text-2.5xl md:text-4xl italic text-[var(--color-text-muted)] font-light leading-snug">
                  \"We do not simple forge crowns; we build financial, digital shields to defend the endangered kingdoms of this planet.\"
                </p>
                <cite className="font-sans text-[9px] tracking-[0.25em] text-[var(--color-gold)] uppercase font-semibold mt-4 block">
                  — CHARLES HIRANYA, MAISON FOUNDER
                </cite>
              </div>
            </div>

            {/* Block 2 */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
              <div className="text-left space-y-6 max-w-xl lg:order-2">
                <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block">
                  Chapter II — Stewardship Vow
                </span>
                <h2 className="font-serif text-3.5xl md:text-5xl text-[var(--color-text)] font-light">
                  Circular Metal & Traced Gems
                </h2>
                <div className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-[1.8] space-y-4 font-light">
                  <p>
                    Our workshop executes strict input controls. We utilize only 100% circular recycled Platinum and 18k ethically-mined artisanal gold, minimizing raw cyanide runoff or dynamic ecosystem hazards.
                  </p>
                  <p>
                    Each diamond, emerald, and sapphire is hand-examined with complete origin certificates. We maintain persistent tracking files on every raw parcel, establishing full accountability back to safe mine registries.
                  </p>
                </div>
              </div>
              <div className="relative h-[25rem] md:h-[35rem] w-full border border-[var(--color-gold)]/20 p-2 lg:order-1 lg:mr-12">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
                  alt="Metals melting setup"
                  className="w-full h-full object-cover filter brightness-[0.7] saturate-[0.6]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* THE CRAFTSPEOPLE PROFILE GRID */
          <motion.div
            key="crafts-content"
            className="max-w-7xl mx-auto px-6 md:px-12 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
              <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] block">
                The Hands that Forge
              </span>
              <h2 className="font-serif text-3.5xl md:text-5.5.xl font-light uppercase text-[var(--color-text)]">
                MEET THE ARTISANS
              </h2>
              <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed font-light">
                Over 60 years of cumulative high-jewelry mastery operates inside our Geneva studio. Click any profile card to unveil their story.
              </p>
            </div>

            {/* Grid of Artisans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artisans.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtisan(art)}
                  className="group bg-[var(--color-bg-dark)]/60 border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)] p-4 cursor-pointer text-left space-y-4 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="aspect-[4/5] overflow-hidden bg-black relative">
                      <img
                        src={art.image}
                        alt={art.name}
                        className="w-full h-full object-cover filter brightness-[0.75] group-hover:brightness-90 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <span className="font-sans text-[10px] tracking-wider text-[var(--color-gold)] uppercase block">
                          Atelier Tenured: {art.years} Years
                        </span>
                      </div>
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-gold)] uppercase block">
                      {art.role.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-2xl text-[var(--color-text)] font-light">
                      {art.name}
                    </h3>
                    <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-3 font-light">
                      {art.bio}
                    </p>
                  </div>

                  <span className="font-sans text-[9px] tracking-[0.2em] text-[var(--color-gold)] uppercase border-t border-[var(--color-gold)]/15 pt-4 block group-hover:translate-x-1 transition-transform">
                    READ BIOGRAPHY ——
                  </span>
                </div>
              ))}
            </div>

            {/* Detailed profile modal */}
            <AnimatePresence>
              {selectedArtisan && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6">
                  {/* Backdrop Close */}
                  <div className="absolute inset-0" onClick={() => setSelectedArtisan(null)} />

                  <motion.div
                    className="relative bg-[var(--color-bg-primary)] border border-[var(--color-gold)] p-8 max-w-2xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 z-10 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {/* Close link */}
                    <button
                      id="artisan-close-btn"
                      onClick={() => setSelectedArtisan(null)}
                      className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white transition-colors"
                    >
                      ✕
                    </button>

                    {/* Column 1 image on desktop */}
                    <div className="md:col-span-5 relative h-64 md:h-full bg-black border border-[var(--color-gold)]/20 p-1">
                      <img
                        src={selectedArtisan.image}
                        alt={selectedArtisan.name}
                        className="w-full h-full object-cover filter brightness-[0.75]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Column 2 text */}
                    <div className="md:col-span-7 text-left space-y-4">
                      <span className="font-sans text-[8px] tracking-[0.25em] text-[var(--color-gold)] uppercase block font-medium">
                        {selectedArtisan.role.toUpperCase()} · {selectedArtisan.years} YEARS AT MAISON
                      </span>
                      <h3 className="font-serif text-3xl text-[var(--color-text)] font-light">
                        {selectedArtisan.name}
                      </h3>
                      <div className="h-[1px] bg-[var(--color-gold)]/20 w-1/3"></div>
                      <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed font-light">
                        {selectedArtisan.bio}
                      </p>
                      <p className="font-sans text-[11px] text-[var(--color-text-muted)] leading-relaxed italic border-l border-[var(--color-gold)]/30 pl-3">
                        \"Fine jewelry is an art of absolute patience. In matching raw facets, we uncover the delicate grace that conservation supports.\"
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
