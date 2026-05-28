/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Award, Compass, Shield, Users, Heart, MapPin, Globe } from "lucide-react";
import { collections, partners } from "../data";
import { SEO } from "../components/SEO";

// Milestone item schema helper
interface Milestone {
  year: string;
  title: string;
  location: string;
  desc: string;
}

const milestones: Milestone[] = [
  { year: "2023", title: "Maison Founded", location: "Geneva, Switzerland", desc: "Wildcraft launches with a promise: fine jewelry will serve as a digital and financial fortress for our remaining wild kingdoms." },
  { year: "2024", title: "First Radar Drones Placed", location: "Kruger Corridor, South Africa", desc: "Successfully deployed three surveillance drone crafts in joint funding with Rhino Protection Trust, eliminating local perimeter breach hazards." },
  { year: "2025", title: "Himalayan Camera Trap Network", location: "Tajikistan High Ridges", desc: "Installed twenty-four high-definition heat-sensitive camera triggers in coordinates mapped by Panthera tracking shepherds." },
  { year: "2026", title: "180 Pangolins Safe Returned", location: "Cardamom Sanctuary, Cambodia", desc: "Direct financing of Wildlife Alliance emergency rescue clinics restored, rehabilitated, and returned 180 pangolins to deep jungle ranges." }
];

// Expanded Stat counter
const ExpandedCounter: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="font-serif text-4xl md:text-5xl text-[var(--color-gold)] font-light mb-1">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export const ConservationImpact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get("view") || "impact";
  const [activeSubView, setActiveSubView] = useState(initialView);

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "partners" || view === "impact") {
      setActiveSubView(view);
    }
  }, [searchParams]);

  // World map markers representing global projects
  const mapPins = [
    { id: 1, cx: "25%", cy: "45%", label: "Central American Reef Support", partner: "Wildlife Alliance", top: "45%", left: "25%" },
    { id: 2, cx: "53%", cy: "68%", label: "Savanna Predator & Rhino Defense", partner: "Rhino Protection Trust", top: "68%", left: "53%" },
    { id: 3, cx: "69%", cy: "35%", label: "High Altitude Telemetry Projects", partner: "Panthera Organization", top: "35%", left: "69%" },
    { id: 4, cx: "78%", cy: "48%", label: "Pangolin Shelter Rehabilitation", partner: "Wildlife Alliance Sanctuary", top: "48%", left: "78%" },
  ];

  const [hoveredPin, setHoveredPin] = useState<typeof mapPins[0] | null>(null);

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)]">
      <SEO
        title={activeSubView === "impact" ? "OUR STEWARDSHIP IMPACT" : "CONSERVATION PARTNERS"}
        description="Learn how WILDCRAFT redirects 10% of luxury jewellery sales to field rangers, solar surveillance, and active species habitat restoration."
      />

      {/* Sub-page Selector Header */}
      <div className="relative border-b border-[var(--color-gold)]/10 py-16 text-center bg-[var(--color-bg-dark)]">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-gold)] block">
            The Shield of Wilderness
          </span>
          <h1 className="font-serif text-4.5xl md:text-6.5xl text-[var(--color-text)] uppercase font-light leading-none">
            {activeSubView === "impact" ? "EVERY PIECE PROTECTS" : "THE STEWARDS"}
          </h1>
          
          {/* Visual sub-switcher tabs */}
          <div className="flex items-center justify-center space-x-6 pt-4">
            <button
              id="subview-btn-impact"
              onClick={() => setActiveSubView("impact")}
              className={`font-sans text-xs tracking-[0.2em] uppercase pb-2 border-b-2 cursor-pointer transition-colors ${
                activeSubView === "impact" ? "border-[var(--color-gold)] text-[var(--color-gold)]" : "border-transparent text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              Our Stewardship Impact
            </button>
            <button
              id="subview-btn-partners"
              onClick={() => setActiveSubView("partners")}
              className={`font-sans text-xs tracking-[0.2em] uppercase pb-2 border-b-2 cursor-pointer transition-colors ${
                activeSubView === "partners" ? "border-[var(--color-gold)] text-[var(--color-gold)]" : "border-transparent text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              Conservation Partners
            </button>
          </div>
        </div>
      </div>

      {activeSubView === "impact" ? (
        /* SUB-PAGE: OUR IMPACT */
        <div className="space-y-24">
          
          {/* Expanded 6 Stat Blocks Grid */}
          <section id="expanded-stats-grid" className="py-20 bg-[var(--color-bg-dark)]/40 border-b border-[var(--color-gold)]/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              {[
                { target: 47, suffix: "+", label: "Protected Species" },
                { target: 2.4, prefix: "$", suffix: "M", label: "Donated To Date" },
                { target: 12, label: "Active Partners" },
                { target: 1200, label: "Square Miles guarded" },
                { target: 350, suffix: "k", label: "Habitat Trees Seeded" },
                { target: 180, label: "Pangolins Rehabilitated" }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <ExpandedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                  <span className="font-sans text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase text-center mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Custom SVG Coordinate World Map */}
          <section id="interactive-impact-map" className="py-12 max-w-7xl mx-auto px-6 md:px-12 text-center">
            <div className="mb-12">
              <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
                Global Coordinates
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-text)] font-light uppercase">
                ACTIVE FIELD SANCTUARIES
              </h2>
              <p className="font-sans text-xs text-[var(--color-text-muted)] mt-2 max-w-sm mx-auto">
                Hover over the golden pins to unveil coordinate projects and associated NGO networks.
              </p>
            </div>

            {/* Custom styled SVG World Map outline + Pins */}
            <div className="relative w-full max-w-5xl mx-auto border border-[var(--color-gold)]/20 p-4 bg-[var(--color-bg-dark)]/60 gold-glow">
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-auto opacity-30 text-[var(--color-text-muted)] select-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                {/* Simulated continents/grid vector outline - elegant minimalist */}
                <path d="M 120 180 Q 200 120 280 140 T 320 200 T 400 320 L 360 400 Q 300 450 250 430 Z" strokeWidth="0.8" strokeDasharray="3,3" />
                <path d="M 450 150 Q 500 100 650 130 T 700 250 T 800 350 L 780 430 Q 700 450 600 420 Z" strokeWidth="0.8" strokeDasharray="3,3" />
                <path d="M 680 180 Q 750 120 850 150 T 920 280 L 850 420 Z" strokeWidth="0.8" strokeDasharray="3,3" />
                <grid stroke="currentColor" strokeWidth="0.1" />
                {/* Horizontal equatorial gold line */}
                <line x1="50" y1="250" x2="950" y2="250" stroke="var(--color-gold)" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.3" />
              </svg>

              {/* Dynamic overlays for pins */}
              {mapPins.map((pin) => (
                <button
                  key={pin.id}
                  id={`map-pin-${pin.id}`}
                  aria-label={pin.label}
                  className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
                  style={{ top: pin.top, left: pin.left }}
                  onMouseEnter={() => setHoveredPin(pin)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <span className="absolute w-6 h-6 rounded-full bg-[var(--color-gold)] animate-ping opacity-25"></span>
                  <MapPin size={16} className="text-[var(--color-gold)] group-hover:text-[var(--color-gold-light)] transition-colors filter drop-shadow" />
                </button>
              ))}

              {/* Pin Detail Overlay popup */}
              <AnimatePresence>
                {hoveredPin && (
                  <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[var(--color-bg-dark)] border border-[var(--color-gold)] p-4 max-w-sm rounded-none text-left shadow-2xl z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <span className="font-sans text-[8px] tracking-[0.25em] text-[var(--color-gold)] uppercase block mb-1">
                      {hoveredPin.partner.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-lg text-[var(--color-text)] leading-snug">
                      {hoveredPin.label}
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Timeline of Milestones */}
          <section id="conservation-milestones" className="py-16 bg-[#160800] border-y border-[var(--color-gold)]/10">
            <div className="max-w-4xl mx-auto px-6">
              
              <div className="text-center mb-16">
                <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block">
                  Historical Vow
                </span>
                <h2 className="font-serif text-3.5xl md:text-5xl text-[var(--color-text)] uppercase tracking-wide font-light">
                  STEWARD CHRONOLOGY
                </h2>
              </div>

              {/* Vertical Timeline wire */}
              <div className="relative border-l border-[var(--color-gold)]/35 pl-8 ml-4 space-y-12 py-4">
                {milestones.map((ms, idx) => (
                  <div key={idx} className="relative text-left">
                    {/* Golden Node dot */}
                    <span className="absolute -left-[41px] top-1.5 w-5 h-5 bg-[var(--color-bg-primary)] border-2 border-[var(--color-gold)] rounded-full flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-[var(--color-gold-light)] rounded-full"></span>
                    </span>

                    {/* Metadata */}
                    <span className="font-serif text-2xl text-[var(--color-gold)] font-medium block">
                      {ms.year}
                    </span>
                    <h3 className="font-serif text-xl text-[var(--color-text)] font-light mt-0.5">
                      {ms.title}
                    </h3>
                    <span className="font-sans text-[9px] tracking-widest text-[var(--color-text-muted)] uppercase block mt-1">
                      {ms.location}
                    </span>
                    <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed max-w-2xl font-light">
                      {ms.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Species spotlight */}
          <section id="conservation-species-spotlight" className="py-16 max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
                The Icons we serve
              </span>
              <h2 className="font-serif text-3.5xl md:text-5.5.xl text-[var(--color-text)] uppercase font-light">
                SPECIES SPOTLIGHT
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collections.slice(0, 3).map((coll) => (
                <div key={coll.id} className="bg-[var(--color-bg-dark)]/40 border border-[var(--color-gold)]/10 p-4 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <img
                      src={coll.heroImage}
                      alt={coll.name}
                      className="w-full h-48 object-cover filter brightness-[0.7] contrast-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex items-center justify-between border-b border-[var(--color-gold)]/15 pb-2">
                      <span className="font-sans text-[10px] text-[var(--color-gold)] font-medium uppercase tracking-wider">
                        {coll.statusBadge}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[var(--color-text)] font-light">
                      {coll.name.replace("The ", "")}
                    </h3>
                    <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed font-light">
                      {coll.speciesFact}
                    </p>
                  </div>

                  <Link
                    to={`/collections/${coll.id}`}
                    className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] hover:text-[var(--color-gold-light)] block mt-6 border-t border-[var(--color-gold)]/10 pt-4"
                  >
                    View Inspired Pieces ——
                  </Link>
                </div>
              ))}
            </div>
          </section>

        </div>
      ) : (
        /* SUB-PAGE: PARTNERS */
        <div id="conservation-partners-view" className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          
          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((pt) => (
              <div
                key={pt.id}
                className="bg-[var(--color-bg-dark)]/80 border border-[var(--color-gold)] p-8 md:p-10 text-left flex flex-col justify-between hover:border-[var(--color-gold-light)] transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className="font-serif text-2xl tracking-[0.2em] text-[var(--color-gold)] uppercase font-semibold block">
                    {pt.logoText}
                  </span>
                  <div className="h-[1px] bg-[var(--color-gold)]/10 w-1/4"></div>
                  <h3 className="font-serif text-xl text-[var(--color-text)] font-light uppercase">
                    {pt.name}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed font-light">
                    {pt.description}
                  </p>
                </div>

                <div className="border-t border-[var(--color-gold)]/10 pt-6 mt-8">
                  <span className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-gold)] uppercase block mb-1">
                    Direct Funding Accomplishment:
                  </span>
                  <p className="font-serif text-sm italic text-[var(--color-text)]">
                    {pt.impactNote}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Become a Partner CTA */}
          <section className="bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 p-8 md:p-16 text-center max-w-3xl mx-auto space-y-6">
            <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] block font-medium">
              Enterprise Collaboration
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[var(--color-text)] font-light uppercase">
              BECOME A CONSERVATION PARTNER
            </h2>
            <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto font-light">
              Are you an audited international NGO or certified habitat rescue program? We actively expand our quarterly pledge distributions to protect critical corridors.
            </p>
            <div className="pt-4">
              <a
                href="mailto:stewardship@wildcraftjewelry.com"
                id="partner-enquiry-email"
                className="inline-block border border-[var(--color-gold)] text-[var(--color-text)] font-sans text-xs tracking-[0.2em] uppercase py-3.5 px-8 hover:bg-[var(--color-bg-mid)] transition-colors inline-block"
              >
                APPLY FOR STEWARDSHIP FUNDING
              </a>
            </div>
          </section>

        </div>
      )}
    </div>
  );
};
