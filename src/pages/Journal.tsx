/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, BookOpen, Clock, Calendar } from "lucide-react";
import { articles } from "../data";
import { SEO } from "../components/SEO";

export const Journal: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");

  // If dynamic slug exists, render full editorial view
  if (slug) {
    const article = articles.find((art) => art.slug === slug);
    if (!article) {
      return (
        <div className="pt-32 pb-24 text-center bg-[var(--color-bg-primary)] min-h-screen flex flex-col justify-center">
          <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Article Not Located</h2>
          <p className="font-sans text-sm text-[var(--color-text-muted)] mb-8">
            The requested stewardship story could not be retrieved from our archives.
          </p>
          <Link to="/journal" className="underline text-[var(--color-gold)] uppercase tracking-[0.1em] text-xs">
            Return to Journal Catalog
          </Link>
        </div>
      );
    }

    // Get related articles (exclude current, max 3)
    const relatedArticles = articles.filter((art) => art.slug !== slug).slice(0, 3);

    return (
      <div className="bg-[var(--color-bg-primary)] min-h-screen">
        <SEO title={article.title.toUpperCase()} description={article.excerpt} />

        {/* Cinematic Header */}
        <header className="relative h-[65vh] md:h-[80vh] flex items-end overflow-hidden border-b border-[var(--color-gold)]/20 z-10">
          <div className="absolute inset-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover filter brightness-[0.45] contrast-105 saturate-70"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-4xl mx-auto w-full px-6 md:px-12 pb-16 relative z-10 text-left">
            <div className="space-y-4">
              {/* Back Button */}
              <button
                id="back-journal-btn"
                onClick={() => navigate("/journal")}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] hover:text-[var(--color-gold-light)] flex items-center mb-6 cursor-pointer"
              >
                <ArrowLeft size={12} className="mr-2" /> Back to Journal Catalog
              </button>

              <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-[var(--color-gold)] uppercase block">
                {article.category} · EDITORIAL BULLETIN
              </span>

              <h1 className="font-serif text-3.5xl md:text-6xl text-[var(--color-text)] leading-tight tracking-wide font-light uppercase">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[var(--color-gold)]/15 text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider">
                <span className="flex items-center"><Calendar size={12} className="mr-1.5" /> {article.date}</span>
                <span className="flex items-center"><Clock size={12} className="mr-1.5" /> 5 Min Read</span>
                <span>By {article.author}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Editorial Article Body */}
        <article className="py-20 max-w-3xl mx-auto px-6 text-left">
          <div className="font-sans text-base md:text-[1.1rem] leading-[2] text-[var(--color-text-muted)] space-y-6 font-light">
            <p className="font-serif italic text-xl md:text-2xl text-[var(--color-text)] leading-relaxed border-b border-[var(--color-gold)]/10 pb-6 mb-8 uppercase tracking-[0.02em]">
              “{article.excerpt}”
            </p>
            
            {/* Split paragraphs or simulated paragraphs */}
            {article.content.split("\n\n").map((para, paraIdx) => (
              <p key={paraIdx}>{para}</p>
            ))}

            {/* Subtle premium divider */}
            <div className="py-8 flex items-center justify-center">
              <span className="h-[1px] bg-[var(--color-gold)]/20 w-1/4"></span>
              <span className="mx-4 text-xs tracking-widest text-[var(--color-gold)]">WILDCRAFT ADVOCACY</span>
              <span className="h-[1px] bg-[var(--color-gold)]/20 w-1/4"></span>
            </div>

            <p>
              When evaluating fine commodities today, tracing holds the greatest weight. Simple pledges or charity stamps are no longer sufficient. By matching precise remote monitoring files directly with purchase triggers, Wildcraft bridges the raw gap between luxury consumption and the biosphere. We represent a life-long stewardship pact.
            </p>
          </div>
        </article>

        {/* BOTTOM: Related articles (3 row cards) */}
        {relatedArticles.length > 0 && (
          <section id="related-letters" className="bg-[var(--color-bg-dark)] py-20 border-t border-[var(--color-gold)]/20 text-left">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <h2 className="font-serif text-3xl text-center text-[var(--color-text)] tracking-wider uppercase mb-16">
                RELATED STORIES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((art) => (
                  <div
                    key={art.slug}
                    onClick={() => navigate(`/journal/${art.slug}`)}
                    className="group bg-[var(--color-bg-primary)] border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)] p-4 cursor-pointer transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden mb-4 bg-black">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-103 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-1">
                      {art.category}
                    </span>
                    <h3 className="font-serif text-xl text-[var(--color-text)] leading-snug font-light group-hover:text-[var(--color-gold-light)] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // Otherwise, render full grid selection
  const featuredArticle = articles[0];
  const secondaryArticles = articles.filter((a) => a.slug !== featuredArticle.slug);

  const filteredSecondary = secondaryArticles.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  );

  return (
    <div className="pt-24 bg-[var(--color-bg-primary)] min-h-screen">
      <SEO
        title="THE JOURNAL BULLETIN"
        description="Familiarize yourself with Wildcraft's deep reports from mountain corridors, anti-poaching patrol blogs, and artisanal jewelry studies."
      />

      {/* Header Banner */}
      <div className="border-b border-[var(--color-gold)]/10 py-16 text-center bg-[var(--color-bg-dark)]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold)] block">
            Archival Briefings
          </span>
          <h1 className="font-serif text-5xl md:text-7xl tracking-wider text-[var(--color-text)] font-light leading-none">
            THE JOURNAL
          </h1>
          <p className="font-sans text-xs text-[var(--color-text-muted)] max-w-sm mx-auto leading-relaxed">
            Steward updates, species profiles, and craftsman details compiled directly by our field coordinators.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[75px] md:top-[85px] z-30 bg-[var(--color-bg-dark)] border-b border-[var(--color-gold)]/15 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center gap-2 flex-wrap">
          {["All", "WILDLIFE", "CRAFTSMANSHIP", "CONSERVATION"].map((cat) => (
            <button
              key={cat}
              id={`journal-cat-btn-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-2 border cursor-pointer transition-all ${
                activeCategory === cat
                  ? "border-[var(--color-gold)] text-[var(--color-gold-light)] bg-[var(--color-bg-mid)]"
                  : "border-[var(--color-gold)]/10 text-[var(--color-text-muted)] hover:border-[var(--color-gold)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-20">
        
        {/* Featured article at top */}
        {activeCategory === "All" && (
          <section id="journal-featured-bulletin" className="border border-[var(--color-gold)]/20 p-4 bg-[var(--color-bg-dark)]/40 gold-glow">
            <div
              onClick={() => navigate(`/journal/${featuredArticle.slug}`)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group text-left"
            >
              <div className="lg:col-span-8 overflow-hidden aspect-[16/9] lg:aspect-[16/8] bg-black">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-101 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-4 space-y-4 pr-4">
                <span className="font-sans text-[9px] tracking-[0.25em] text-[var(--color-gold)] uppercase block">
                  Featured · {featuredArticle.category}
                </span>

                <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] hover:text-[var(--color-gold-light)] transition-colors font-light uppercase leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed font-light line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                  <span>{featuredArticle.date}</span>
                  <span className="text-[var(--color-gold)] font-sans tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
                    READ ARTICLE →
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3-column masonry grid */}
        <section id="secondary-stories">
          {filteredSecondary.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
                No matching articles located in this archive.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSecondary.map((art) => (
                <div
                  key={art.slug}
                  onClick={() => navigate(`/journal/${art.slug}`)}
                  className="group bg-[var(--color-bg-dark)]/40 border border-[var(--color-gold)]/10 hover:border-[var(--color-gold)] p-4 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="aspect-[16/10] overflow-hidden bg-black relative">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-85 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.2em] text-[var(--color-gold)] uppercase block">
                      {art.category}
                    </span>
                    <h3 className="font-serif text-2xl text-[var(--color-text)] hover:text-[var(--color-gold-light)] transition-colors font-light leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2 font-light">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--color-gold)]/10 text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] mt-auto">
                    <span>{art.date}</span>
                    <span className="text-[var(--color-gold)] font-sans tracking-widest font-medium group-hover:translate-x-1 transition-transform">
                      VIEW FILE →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
