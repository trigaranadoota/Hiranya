/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";
import { collections, products } from "../data";
import { Watermark } from "../components/Watermark";
import { useApp } from "../context/AppContext";
import { SEO } from "../components/SEO";

// Count Up subcomponent for Conservation Counter that triggers on scroll
const StatCounter: React.FC<{ target: number; suffix?: string; prefix?: string; duration?: number }> = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <div ref={ref} className="font-serif text-5xl md:text-7xl text-[var(--color-text)] font-light mb-2">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useApp();

  // Scroll to featured collections
  const scrollNext = () => {
    const nextSection = document.getElementById("ticker-marquee");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="pt-20">
      <SEO
        title="WHERE BEAUTY PROTECTS THE WILD"
        description="Every purchase of WILDCRAFT luxury fine jewelry directly funds global endangered wildlife conservation and habitat restoration patrols."
      />

      {/* SECTION 1: HERO VIEW */}
      <section
        id="home-hero"
        className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between bg-[var(--color-bg-primary)] overflow-hidden py-12"
      >
        {/* Wildlife background watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <Watermark type="panther" className="w-[60%] h-[60%] text-[var(--color-gold)] scale-150" opacity={0.06} />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left space-y-8">
            <h1 className="leading-tight">
              <span className="block font-serif text-5xl md:text-8xl font-light uppercase tracking-[0.05em] text-[var(--color-text)] mb-2">
                WHERE BEAUTY
              </span>
              <span className="block font-serif text-4.5xl md:text-7.5xl italic font-light text-[var(--color-text-muted)]">
                protects the wild.
              </span>
            </h1>

            <div className="space-y-6">
              <div className="h-[1px] bg-[var(--color-gold)] w-32"></div>
              <p className="font-sans text-sm md:text-base tracking-widest uppercase text-[var(--color-text-muted)] font-light">
                Fine jewelry. Real conservation.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/collections"
                id="hero-explore-btn"
                className="inline-block border border-[var(--color-gold)] text-[var(--color-text)] font-sans text-xs tracking-[0.2em] uppercase py-4 px-8 tracking-[0.2em] transition-all duration-300 hover:bg-[var(--color-bg-mid)] hover:shadow-lg cursor-pointer font-medium"
              >
                EXPLORE THE COLLECTIONS
              </Link>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative group max-w-sm md:max-w-md w-full border border-[var(--color-gold)]/20 p-2">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80"
                alt="WILDCRAFT Glacial Ring"
                className="w-full h-[32rem] object-cover filter brightness-90 saturate-50 contrast-110 group-hover:brightness-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/40 p-4 hidden md:block max-w-[200px]">
                <span className="font-sans text-[8px] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-1">
                  Maison Spotlight
                </span>
                <span className="font-serif text-sm text-[var(--color-text)] block">
                  The Snow Leopard Glacial Ring
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          id="hero-scroll-trigger"
          onClick={scrollNext}
          aria-label="Scroll to content"
          className="mx-auto flex flex-col items-center space-y-2 cursor-pointer text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors py-6 relative z-10"
        >
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[var(--color-text-muted)]">
            Scroll To Discover
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.div>
        </button>
      </section>

      {/* SECTION 2: MARQUEE TICKER */}
      <div
        id="ticker-marquee"
        className="bg-[var(--color-bg-dark)] border-y border-[var(--color-gold)]/20 overflow-hidden py-3 text-xs md:text-sm h-11 relative z-20"
      >
        <div className="animate-marquee whitespace-nowrap text-[var(--color-text)] font-sans tracking-[0.25em] uppercase text-[10px] flex items-center gap-1">
          {Array(4)
            .fill(
              "FREE SHIPPING WORLDWIDE · 10% OF EVERY SALE FUNDS WILDLIFE CONSERVATION · ETHICALLY SOURCED GEMSTONES · HANDCRAFTED IN SMALL BATCHES · EACH PIECE NAMES AN ENDANGERED SPECIES ·   "
            )
            .map((text, idx) => (
              <span key={idx} className="inline-block mr-4">
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* SECTION 3: THE COLLECTIONS */}
      <section id="featured-collections" className="py-24 bg-[var(--color-bg-primary)] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariant}
            className="mb-16"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-[var(--color-text)] tracking-wider uppercase mb-3">
              THE COLLECTIONS
            </h2>
            <div className="h-[1px] bg-[var(--color-gold)] w-24 mx-auto mt-4"></div>
          </motion.div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/10 overflow-hidden">
            {collections.slice(0, 3).map((coll, index) => (
              <motion.div
                key={coll.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                onClick={() => navigate(`/collections/${coll.id}`)}
                className="relative aspect-[3/4] group cursor-pointer overflow-hidden bg-[var(--color-bg-dark)]"
              >
                <img
                  src={coll.heroImage}
                  alt={coll.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-75 contrast-110 saturate-[0.6]"
                  referrerPolicy="no-referrer"
                />
                {/* Always-on label at bottom */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/50 to-transparent flex flex-col items-start transition-opacity duration-500 group-hover:opacity-0 text-left">
                  <span className="font-sans text-[9px] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-2">
                    {coll.statusBadge.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <h3 className="font-serif text-2xl text-[var(--color-text)] line-clamp-1">
                    {coll.name.replace("The ", "")}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--color-bg-dark)]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8 md:p-10 text-left">
                  <div className="space-y-3">
                    <span className="font-sans text-[9px] tracking-[0.25em] text-[var(--color-gold)] uppercase block">
                      {coll.scientificName} · {coll.status}
                    </span>
                    <h3 className="font-serif text-3xl text-[var(--color-text)]">
                      {coll.name}
                    </h3>
                    <p className="font-sans text-xs text-[var(--color-text-muted)] line-clamp-4 leading-relaxed font-light">
                      {coll.story}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="font-sans text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] uppercase border-t border-[var(--color-gold)]/10 pt-4">
                      {coll.materials}
                    </p>
                    <span className="font-sans text-xs text-[var(--color-text)] tracking-[0.15em] hover:text-[var(--color-gold)] transition-colors flex items-center uppercase mt-6 group/link">
                      DISCOVER COLLECTION <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              to="/collections"
              id="all-collections-banner-btn"
              className="inline-block border border-[var(--color-gold)] text-[var(--color-text)] font-sans text-xs tracking-[0.2em] uppercase py-4 px-10 hover:bg-[var(--color-bg-mid)] transition-colors duration-300 cursor-pointer font-medium"
            >
              VIEW ALL COLLECTIONS
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: EDITORIAL SPLIT */}
      <section id="editorial-split" className="relative border-t border-[var(--color-gold)]/10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Full bleed image */}
          <div className="relative h-[30rem] lg:h-[45rem]">
            <img
              src="https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1200&auto=format&fit=crop&q=80"
              alt="Maison Craftspeople"
              className="w-full h-full object-cover filter brightness-[0.65] contrast-105 saturate-[0.55]"
              referrerPolicy="no-referrer"
            />
            {/* Absolute caption */}
            <div className="absolute bottom-8 left-8 text-left">
              <span className="font-sans text-[8px] tracking-[0.2em] text-[var(--color-gold)] uppercase">
                Species Advocacy
              </span>
              <p className="font-serif text-sm text-[var(--color-text)] italic mt-1 font-light">
                Wildcraft guards the remaining habitats of Northern Siberia.
              </p>
            </div>
          </div>

          {/* Right Text Block */}
          <div className="bg-[var(--color-bg-primary)] px-8 md:px-16 lg:px-24 flex flex-col justify-center py-16 lg:py-0 border-t lg:border-t-0 lg:border-l border-[var(--color-gold)]/10 text-left relative z-10">
            <div className="max-w-xl space-y-8">
              <span className="font-sans text-[0.7rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-2 font-medium">
                Our Sovereign Intent
              </span>

              <h2 className="font-serif text-3xl md:text-5.5.xl italic leading-tight text-[var(--color-text-muted)] font-light">
                \"We sculpt exquisite tokens that carry the soul of wild, critical kingdoms.\"
              </h2>

              <p className="font-sans text-sm md:text-base text-[var(--color-text)] leading-[1.8] font-light">
                At WILDCRAFT, every gem selection and hammer stroke serves a higher path. We align traditional high-jewelry design with intense landscape stewardship. 10% of every sale is directly transferred to our partner organizations—funding tracking bands, field-ranger stations, and species rehab.
              </p>

              <div className="pt-4">
                <Link
                  to="/conservation/impact"
                  className="font-sans text-xs tracking-[0.2em] text-[var(--color-text)] uppercase font-medium group flex items-center hover:text-[var(--color-gold)] transition-colors inline-block border-b border-[var(--color-gold)]/30 pb-1"
                >
                  DISCOVER THE IMPACT ——
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CONSERVATION COUNTER */}
      <section id="conservation-counter-section" className="bg-[var(--color-bg-dark)] py-20 border-t border-[var(--color-gold)]/15">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-sans text-[0.75rem] tracking-[0.35em] text-[var(--color-gold)] uppercase block mb-12 font-medium">
            OUR COMMITMENT
          </span>

          {/* Stat blocks separated by gold lines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center justify-center">
            
            {/* Block 1 */}
            <div className="flex flex-col items-center py-6 md:px-6">
              <StatCounter target={47} suffix="+" />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] text-[var(--color-text-muted)] uppercase font-light">
                Species Supported
              </span>
            </div>

            {/* Block 2 */}
            <div className="flex flex-col items-center py-6 md:px-6 border-y md:border-y-0 md:border-x border-[var(--color-gold)]/20">
              <StatCounter target={2.4} prefix="$" suffix="M" duration={2500} />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] text-[var(--color-text-muted)] uppercase font-light">
                Donated To Date
              </span>
            </div>

            {/* Block 3 */}
            <div className="flex flex-col items-center py-6 md:px-6">
              <StatCounter target={12} />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] text-[var(--color-text-muted)] uppercase font-light">
                Stewardship Partners
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: PRODUCT SPOTLIGHT / NEW ARRIVALS */}
      <section id="product-spotlight" className="py-24 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
                La Nouveauté
              </span>
              <h2 className="font-serif text-4xl md:text-5.5xl text-[var(--color-text)] uppercase font-light tracking-wide">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              to="/collections"
              className="font-sans text-xs tracking-[0.2em] text-[var(--color-gold)] uppercase border-b border-[var(--color-gold)]/30 pb-0.5 hover:text-[var(--color-gold-light)] transition-colors"
            >
              Browse All Masterworks ——
            </Link>
          </div>

          {/* 4-column product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((prod) => {
              const coll = collections.find((c) => c.id === prod.collectionId);
              return (
                <div
                  key={prod.id}
                  onClick={() => navigate(`/collections/${prod.collectionId}/${prod.id}`)}
                  className="group relative flex flex-col justify-between bg-[var(--color-bg-dark)]/30 border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)] p-3 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-2xl"
                >
                  {/* Image container */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ transitionDuration: '1000ms' }}
                      className="w-full h-full object-cover transition-transform group-hover:scale-103 filter brightness-[0.85] contrast-[1.05]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Wishlist Icon top-right */}
                    <button
                      id={`wish-btn-${prod.id}`}
                      aria-label="Toggle Wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-[var(--color-bg-dark)]/80 hover:bg-[var(--color-bg-dark)] rounded-full text-[var(--color-text)] hover:text-red-500 transition-colors border border-[var(--color-gold)]/20 shadow-md"
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
                  <div className="flex flex-col space-y-2 text-left px-1">
                    <span className="font-sans text-[9px] tracking-[0.2em] text-[var(--color-gold)] uppercase block">
                      {coll?.name.replace("The ", "") || "Maison Fine"}
                    </span>
                    <h3 className="font-serif text-lg text-[var(--color-text)] line-clamp-1">
                      {prod.name}
                    </h3>
                    <div className="flex items-center justify-between border-t border-[var(--color-gold)]/10 pt-2 mt-1">
                      <span className="font-sans text-[10px] tracking-wider text-[var(--color-text-muted)] uppercase">
                        FROM ${prod.price.toLocaleString()}
                      </span>
                      <span className="font-sans text-[9px] tracking-widest text-[var(--color-gold)] font-medium uppercase group-hover:translate-x-1 transition-transform">
                        ACQUIRE →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 7: WILDLIFE STORY EDITORIAL */}
      <section id="wildlife-story-editorial" className="relative bg-[var(--color-bg-dark)] py-24 overflow-hidden border-t border-[var(--color-gold)]/15">
        {/* Giant Watermark Species Background Text */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 font-serif text-[12vw] tracking-wider font-bold text-[var(--color-gold)]/3 uppercase leading-none select-none pointer-events-none">
          PANGOLIN
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Text */}
          <div className="text-left space-y-8 max-w-xl">
            <span className="font-sans text-[0.7rem] tracking-[0.35em] text-[var(--color-gold)] uppercase block">
              The Living Jewel
            </span>
            
            <h2 className="font-serif text-3.5xl md:text-5xl italic font-light text-[var(--color-text)] leading-tight">
              \"To wrap oneself in the gilded shells of advocacy.\"
            </h2>

            <div className="space-y-4 font-sans text-sm text-[var(--color-text-muted)] leading-[1.8] font-light">
              <p>
                The Pangolin represents a delicate architecture, structured layer by layer for protection against the elements, yet entirely defenseless against human trespass. Wildcraft honors this marvel with our signature rose gold scales, mimicking their natural plates.
              </p>
              <p>
                Each cuff requires our master goldsmiths and diamond cutters over 140 meticulous hours of alignment. Through your acquisition, we fund local veterinary intervention checkpoints that heal and return rescued scales to Cambodian forest ranges.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/journal/art-of-the-pangolin-shield"
                className="font-sans text-xs tracking-[0.2em] text-[var(--color-text)] uppercase group flex items-center hover:text-[var(--color-gold)] transition-colors inline-block pb-0.5 border-b border-[var(--color-gold)]/30"
              >
                READ THE CRAFT STORY ——
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[25rem] lg:h-[35rem] w-full border border-[var(--color-gold)]/25 p-2 bg-[var(--color-bg-primary)]">
            <img
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80"
              alt="Pangolin Advocacy habitat"
              className="w-full h-full object-cover filter brightness-[0.7] contrast-105 saturate-70"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </section>

      {/* SECTION 8: BESPOKE TEASER */}
      <section id="bespoke-teaser-home" className="py-24 bg-[var(--color-bg-primary)] relative border-t border-[var(--color-gold)]/10 text-center flex flex-col items-center">
        {/* Slender gold lines flanking */}
        <div className="hidden lg:block absolute left-24 top-0 bottom-0 w-[1px] bg-[var(--color-gold)]/15"></div>
        <div className="hidden lg:block absolute right-24 top-0 bottom-0 w-[1px] bg-[var(--color-gold)]/15"></div>

        <div className="max-w-2xl px-6 space-y-6">
          <span className="font-sans text-[0.75rem] tracking-[0.4em] text-[var(--color-gold)] uppercase block">
            BESPOKE CREATIONS
          </span>
          
          <h2 className="font-serif text-4.5xl md:text-6.5xl text-[var(--color-text)] uppercase tracking-wide font-light leading-snug">
            A Piece Made Only For You
          </h2>
          
          <p className="font-sans text-sm md:text-base text-[var(--color-text-muted)] leading-[1.8] max-w-lg mx-auto font-light">
            Entrust our master craftspeople in Geneva to capture your soul's animal guardian. Hand-sketched layouts, conflict-free emeralds or diamonds, and ethical metalcrafting shaped specifically for your lineage.
          </p>

          <div className="pt-6">
            <Link
              to="/bespoke"
              id="home-bespoke-cta"
              className="inline-block border border-[var(--color-gold)] text-[var(--color-text)] font-sans text-xs tracking-[0.2em] uppercase py-4 px-10 hover:bg-[var(--color-bg-mid)] transition-colors duration-300 font-medium cursor-pointer"
            >
              BEGIN YOUR JOURNEY
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: PRESS LOGOS */}
      <section id="press-logos" className="py-16 bg-[var(--color-bg-dark)] border-t border-[var(--color-gold)]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-sans text-[10px] tracking-[0.25em] text-[var(--color-text-muted)] uppercase block mb-8 font-light">
            As Seen In
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-35">
            {["VOGUE", "HARPER'S BAZAAR", "THE NEW YORK TIMES", "THE FINANCIAL TIMES", "ROBB REPORT"].map((press, idx) => (
              <span
                key={idx}
                className="font-serif text-sm md:text-lg tracking-[0.3em] text-[var(--color-text)] font-semibold transition-opacity duration-300 hover:opacity-100 select-none cursor-default"
              >
                {press}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
