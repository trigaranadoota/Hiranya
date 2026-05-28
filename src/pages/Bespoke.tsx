/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, CheckCircle, ArrowRight } from "lucide-react";
import { SEO } from "../components/SEO";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  { q: "What is the typical timeframe for a Bespoke Hiranya commission?", a: "Each commission undergoes deep, iterative craftsmanship. From first raw digital layouts and color matching to master stone-setting and final hallmarks, the process takes approximately 8 to 12 weeks." },
  { q: "Can I supply my own gemstones or heirloom jewelry for remodeling?", a: "In alignment with our strict Stewardship pledge, we only embed ethically certified, conflict-free gemstones with direct origin tracking, or source fully recycled circular metals. We are happy to evaluate family archives on a case-by-case basis." },
  { q: "How is the conservation funding portion decided for bespoke pieces?", a: "Precisely like our core Collections, 10% of the entire commission value of your custom commission is directly allocated to the endangered wildlife conservation partner of your choice, in alignment with your personal animal guardian." },
  { q: "Is international insured shipping included?", a: "Yes. All bespoke deliveries undergo secure, custom armored-courier dispatch with full insurance coverage, globally, at no extra cost to the patron." }
];

export const Bespoke: React.FC = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [enquiryMode, setEnquiryMode] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    type: "Ring",
    occasion: "",
    budget: "$5,000 - $10,000",
    inspiration: "",
    source: "Instagram"
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      type: "Ring",
      occasion: "",
      budget: "$5,000 - $10,000",
      inspiration: "",
      source: "Instagram"
    });
    setFormSubmitted(false);
    setEnquiryMode(false);
  };

  return (
    <div className="pt-20 bg-[var(--color-bg-primary)]">
      <SEO
        title={enquiryMode ? "BESPOKE ENQUIRY" : "A PIECE MADE ONLY FOR YOU"}
        description="Sculpt a personalized fine jewelry masterpiece with Hiranya's Geneva artisans. Every bespoke request funds global animal habitat restoration."
      />

      <AnimatePresence mode="wait">
        {!enquiryMode ? (
          /* HOW IT WORKS PORTAL */
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* HERO PANEL */}
            <section className="relative min-h-[90vh] flex flex-col justify-center bg-[var(--color-bg-dark)] py-20 px-6 border-b border-[var(--color-gold)]/20 text-center">
              {/* Abstract decorative vertical lines */}
              <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-[var(--color-gold)]/5"></div>
              <div className="absolute top-0 bottom-0 right-1/4 w-[1px] bg-[var(--color-gold)]/5"></div>

              <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                <span className="font-sans text-[0.75rem] uppercase tracking-[0.4em] text-[var(--color-gold)] block font-medium">
                  Atelier Haute Joaillerie
                </span>
                <h1 className="font-serif text-5xl md:text-8xl tracking-wider text-[var(--color-text)] uppercase font-light leading-none">
                  A PIECE MADE ONLY <br className="hidden md:inline" /> FOR YOU
                </h1>
                <p className="font-serif text-2xl md:text-3.5xl italic text-[var(--color-text-muted)] font-light max-w-2xl mx-auto">
                  \"Where your lineage meets the spirit of wild preservation.\"
                </p>
                
                <div className="pt-8">
                  <button
                    id="bespoke-begin-cta"
                    onClick={() => setEnquiryMode(true)}
                    className="border border-[var(--color-gold)] text-[var(--color-text)] font-sans text-xs tracking-[0.25em] uppercase py-4.5 px-10 hover:bg-[var(--color-bg-mid)] hover:shadow-2xl transition-all font-medium cursor-pointer"
                  >
                    BEGIN YOUR INITIALLY CONSULTATION
                  </button>
                </div>
              </div>
            </section>

            {/* PROCESS LINES - 5 Step Timeline with numbered gold circles */}
            <section className="py-24 border-b border-[var(--color-gold)]/10">
              <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] block mb-1">
                  The Metamorphosis
                </span>
                <h2 className="font-serif text-4xl md:text-5.5.xl uppercase text-[var(--color-text)] tracking-wider mb-20 font-light">
                  THE CHRONOLOGY of CRAFT
                </h2>

                {/* Horizontal row pattern for desktop, vertical on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                  
                  {/* Subtle connecting grey line on desktop */}
                  <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-[var(--color-gold)]/20 z-0"></div>

                  {[
                    { no: "1", title: "Consultation", desc: "Private briefing with our lead director to select your animal guardian and mapped preferences." },
                    { no: "2", title: "Design Sketch", desc: "Our sketch artists output three hand-carved charcoal and digital options optimizing stone layouts." },
                    { no: "3", title: "Stone Selection", desc: "Ethical tracing of unique D-grade flawless diamonds or custom raw emerald blocks." },
                    { no: "4", title: "Crafting", desc: "Artisans at our Geneva studio forge, hammer, set and hallmark your custom metal crown details." },
                    { no: "5", title: "Delivery", desc: "Armored-courier insured dispatch accompanied by your Custom certified Stewardship Ledger." }
                  ].map((step, idx) => (
                    <div key={idx} className="space-y-4 text-center relative z-10 flex flex-col items-center">
                      {/* Number gold circle */}
                      <div className="w-20 h-20 rounded-full border border-[var(--color-gold)] flex items-center justify-center bg-[var(--color-bg-primary)] font-serif text-xl text-[var(--color-gold)] mb-4 shadow-xl">
                        {step.no}
                      </div>
                      <h3 className="font-serif text-xl font-medium text-[var(--color-text)]">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed max-w-[200px] mx-auto font-light">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* MATERIALS SHOWCASE */}
            <section className="py-24 bg-[var(--color-bg-dark)]/50 border-b border-[var(--color-gold)]/10">
              <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] block mb-12">
                  The Noble Elements
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Circular Platinum 950", desc: "Heavyweight glacial platinum, completely refined from circular recycled streams. Zero toxic chemical operations.", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80" },
                    { title: "18K Sourced Yellow Gold", desc: "Warm, lustrous heavy golden alloy sourced under fair-trade protocols from artisanal mine corridors.", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=80" },
                    { title: "18K Gilded Rose Gold", desc: "Soft elegant blush hues crafted with copper alloy components, bringing standard timeless grace.", img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&auto=format&fit=crop&q=80" }
                  ].map((mat, idx) => (
                    <div key={idx} className="border border-[var(--color-gold)]/15 p-6 bg-[var(--color-bg-dark)] text-left flex flex-col space-y-4 hover:border-[var(--color-gold)] transition-colors duration-500">
                      <img
                        src={mat.img}
                        alt={mat.title}
                        className="w-full h-40 object-cover filter brightness-[0.7] saturate-[0.65]"
                        referrerPolicy="no-referrer"
                      />
                      <h3 className="font-serif text-xl tracking-wide text-[var(--color-text)]">
                        {mat.title}
                      </h3>
                      <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed font-light">
                        {mat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIALS PANEL */}
            <section className="py-24 max-w-4xl mx-auto px-6 text-center text-[var(--color-text)]">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] text-[var(--color-gold)] block mb-8">
                Patron Echoes
              </span>
              <blockquote className="font-serif text-2.5xl md:text-4xl italic text-[var(--color-text-muted)] font-light leading-snug">
                \"The Snow Leopard cuff I received exceeds premium jewelry. It feels like an armor plate of sheer grace, knowing our investment protects four shepherd patrols in their mountain valleys.\"
              </blockquote>
              <cite className="font-sans text-xs tracking-widest text-[var(--color-gold)] uppercase block mt-6 font-medium not-italic">
                — Lady Margaret V., Basel
              </cite>
            </section>

            {/* ACCORDION FAQ SECTION */}
            <section className="py-24 bg-[var(--color-bg-dark)] border-t border-[var(--color-gold)]/15">
              <div className="max-w-3xl mx-auto px-6">
                
                <div className="text-center mb-16">
                  <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] block">
                    Assistance Records
                  </span>
                  <h2 className="font-serif text-3.5xl md:text-5xl uppercase font-light tracking-wide text-[var(--color-text)]">
                    BESPOKE INQUIRIES
                  </h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-[var(--color-gold)]/20 pb-4 text-left">
                      <button
                        id={`faq-btn-${idx}`}
                        onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left font-sans text-xs md:text-sm tracking-wide text-[var(--color-text)] py-3 hover:text-[var(--color-gold)] cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {activeFAQ === idx ? (
                          <Minus size={14} className="text-[var(--color-gold)]" />
                        ) : (
                          <Plus size={14} className="text-[var(--color-gold)]" />
                        )}
                      </button>
                      <AnimatePresence>
                        {activeFAQ === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed font-light mt-2"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

              </div>
            </section>

          </motion.div>
        ) : (
          /* BESPOKE ENQUIRY FORM PANEL */
          <motion.div
            key="enquiry-form"
            className="max-w-7xl mx-auto px-6 md:px-12 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
              
              {/* Left Panel: Quote and Picture */}
              <div className="lg:col-span-4 text-left space-y-8 lg:sticky lg:top-32 bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/25 p-8 gold-glow">
                <span className="font-sans text-[8px] tracking-[0.25em] text-[var(--color-gold)] uppercase block font-semibold">
                  Maison Vow
                </span>
                <p className="font-serif text-xl italic text-[var(--color-text)] leading-relaxed">
                  \"To begin modeling is to embark on an exceptional stewardship alliance.\"
                </p>
                <div className="h-[1px] bg-[var(--color-gold)]/10"></div>
                
                <img
                  src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&auto=format&fit=crop&q=80"
                  alt="Drafting Sketch Book"
                  className="w-full h-44 object-cover filter brightness-[0.75]"
                  referrerPolicy="no-referrer"
                />

                <p className="font-sans text-[11px] text-[var(--color-text-muted)] leading-relaxed uppercase">
                  Geneva · London · New York Salons
                </p>
              </div>

              {/* Right Panel: Clean minimal Form */}
              <div className="lg:col-span-8 bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/20 p-8 md:p-12 text-left space-y-8">
                
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-6">
                    <CheckCircle size={48} className="text-[var(--color-gold)] mx-auto" />
                    <h2 className="font-serif text-3xl md:text-4.5xl text-[var(--color-text)]">
                      Enquiry Registered
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
                      Thank you. Your dossier has been transferred to our Geneva private salon. A designated steward representative will call or write within 24 hours.
                    </p>
                    <button
                      id="reset-bespoke-form-btn"
                      onClick={resetForm}
                      className="border border-[var(--color-gold)] text-white px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-[var(--color-bg-mid)] transition-colors inline-block"
                    >
                      RETURN TO BESPOKE PORTAL
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2 block">
                        Steward Registration
                      </span>
                      <h2 className="font-serif text-3.5xl md:text-4.5xl text-[var(--color-text)] font-light uppercase">
                        BESPOKE COMMISSION ENQUIRY
                      </h2>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2 flex flex-col">
                          <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-name">Full Name *</label>
                          <input
                            id="form-name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleFormChange}
                            className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] focus:ring-1 focus:ring-[var(--color-gold-light)]"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2 flex flex-col">
                          <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-email">Email Address *</label>
                          <input
                            id="form-email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] focus:ring-1 focus:ring-[var(--color-gold-light)]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="space-y-2 flex flex-col">
                          <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-phone">Contact Phone</label>
                          <input
                            id="form-phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] focus:ring-1 focus:ring-[var(--color-gold-light)]"
                          />
                        </div>

                        {/* Country */}
                        <div className="space-y-2 flex flex-col">
                          <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-country">Residing Country</label>
                          <input
                            id="form-country"
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleFormChange}
                            className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] focus:ring-1 focus:ring-[var(--color-gold-light)]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sizing / Piece Type */}
                        <div className="space-y-2 flex flex-col">
                          <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-type">Category of Piece</label>
                          <select
                            id="form-type"
                            name="type"
                            value={formData.type}
                            onChange={handleFormChange}
                            className="bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                          >
                            <option value="Ring">Solitary Ring</option>
                            <option value="Necklace">Fine Necklace</option>
                            <option value="Bracelet">Articulated Bracelet</option>
                            <option value="Earring">Drop Earrings</option>
                            <option value="Cuff">Dorsal Armlet / Cuff</option>
                          </select>
                        </div>

                        {/* Occasion */}
                        <div className="space-y-2 flex flex-col">
                          <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-occasion">Occasion</label>
                          <input
                            id="form-occasion"
                            type="text"
                            name="occasion"
                            placeholder="Heirloom, Marriage, Anniversary"
                            value={formData.occasion}
                            onChange={handleFormChange}
                            className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] placeholder-gray-700"
                          />
                        </div>

                        {/* Budget Range */}
                        <div className="space-y-2 flex flex-col">
                          <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-budget">Budget Target *</label>
                          <select
                            id="form-budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleFormChange}
                            className="bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                          >
                            <option value="Under $5,000">Under $5,000 USD</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000 USD</option>
                            <option value="$10,000 - $25,000">$10,000 - $25,000 USD</option>
                            <option value="$25,000 - $50,000">$25,000 - $50,000 USD</option>
                            <option value="$50,000+">Above $50,000 USD</option>
                          </select>
                        </div>
                      </div>

                      {/* Inspiration description */}
                      <div className="space-y-2 flex flex-col">
                        <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-inspiration">Inspiration Notes & Animal Guardian Preferences</label>
                        <textarea
                          id="form-inspiration"
                          name="inspiration"
                          rows={4}
                          placeholder="Please describe any preferred gemstones, custom metal cuts, or specific wildlife stewardship organization you wish to fund..."
                          value={formData.inspiration}
                          onChange={handleFormChange}
                          className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] placeholder-gray-700"
                        />
                      </div>

                      {/* How did you hear about us */}
                      <div className="space-y-2 flex flex-col">
                        <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="form-source">Where did you discover Hiranya?</label>
                        <select
                          id="form-source"
                          name="source"
                          value={formData.source}
                          onChange={handleFormChange}
                          className="bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                        >
                          <option value="Instagram">Instagram / Social Medias</option>
                          <option value="Vogue">Vogue or Print Media</option>
                          <option value="Financial Times">The Financial Times</option>
                          <option value="Referral">Private Salon Referral</option>
                          <option value="Stewardship">Global Conservation Summit</option>
                        </select>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          id="submit-bespoke-form-btn"
                          type="submit"
                          className="border border-[var(--color-gold)] text-white font-sans text-xs tracking-widest uppercase py-4 px-10 hover:bg-[var(--color-bg-mid)] transition-colors cursor-pointer"
                        >
                          SUBMIT ENQUIRY DOSSIER
                        </button>
                        <button
                          id="back-bespoke-portal-btn"
                          type="button"
                          onClick={() => setEnquiryMode(false)}
                          className="font-sans text-xs text-[var(--color-text-muted)] hover:text-white"
                        >
                          Return to Portal
                        </button>
                      </div>

                    </form>
                  </>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
