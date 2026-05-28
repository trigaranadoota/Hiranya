/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import { boutiques } from "../data";
import { SEO } from "../components/SEO";

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    boutique: "Geneva Salon (HQ)",
    subject: "Private Viewing Inquiry",
    message: ""
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)] text-left">
      <SEO title="BOOK A VIEWING SESSION" description="Connect with our global salons in Geneva, New York, or London to view inspired fine collections." />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Header */}
        <div className="border-b border-[var(--color-gold)]/10 pb-6 mb-12">
          <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
            Global Coordination
          </span>
          <h1 className="font-serif text-3.5xl md:text-5xl text-white uppercase font-light">
            CONNECT WITH THE MAISON
          </h1>
          <p className="font-sans text-xs text-[var(--color-text-muted)] mt-1">
            Book private viewings, consult custom remolding, or learn about our verified NGO ledger.
          </p>
        </div>

        {/* Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact CRM Form */}
          <div className="lg:col-span-7 bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/15 p-6 md:p-10 text-left">
            {formSubmitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle size={48} className="text-[var(--color-gold)] mx-auto" />
                <h2 className="font-serif text-2.5xl text-white font-light">Enquiry Docket Opened</h2>
                <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
                  Your private viewing requests has been queued at the {formData.boutique}. A designated coordinator will contact you by phone or email within 12 business hours.
                </p>
                <div className="pt-4">
                  <button
                    id="contact-refresh-btn"
                    onClick={() => { setFormSubmitted(false); setFormData({ name: "", email: "", phone: "", boutique: "Geneva Salon (HQ)", subject: "Private Viewing Inquiry", message: "" }); }}
                    className="border border-[var(--color-gold)] text-white px-6 py-2.5 font-sans text-xs tracking-widest uppercase hover:bg-[var(--color-bg-mid)] transition-colors inline-block cursor-pointer"
                  >
                    SUBMIT NEW BRIEFING
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <h2 className="font-serif text-2xl text-white font-light mb-6">Private Salon Briefing</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cli-name">Your Full Name *</label>
                    <input
                      id="cli-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cli-email">Email Address *</label>
                    <input
                      id="cli-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cli-phone">Phone Number</label>
                    <input
                      id="cli-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cli-boutique">Preferred Salon Viewing Location</label>
                    <select
                      id="cli-boutique"
                      name="boutique"
                      value={formData.boutique}
                      onChange={handleFormChange}
                      className="bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] cursor-pointer"
                    >
                      <option value="Geneva Salon (HQ)">Geneva Salon (HQ) · Rue du Rhône</option>
                      <option value="London Salon">London Salon · New Bond St</option>
                      <option value="New York Salon">New York Salon · Fifth Ave</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 flex flex-col">
                  <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cli-subject">Intent Dossier Subject</label>
                  <select
                    id="cli-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    className="bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] cursor-pointer"
                  >
                    <option value="Private Viewing Inquiry">Private Viewing Appointment</option>
                    <option value="Bespoke Commission">Bespoke Diamond Remolding Commission</option>
                    <option value="Stewardship Ledger Query">Stewardship NGO Ledger Audits</option>
                    <option value="General Maison Inquiry">General Brand Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5 flex flex-col">
                  <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cli-message">Inspiration & Briefing Notes</label>
                  <textarea
                    id="cli-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="We welcome pre-view instructions, preferred materials or specific sizing notes to assist our master jewelers prior to your visit..."
                    value={formData.message}
                    onChange={handleFormChange}
                    className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] placeholder-gray-700"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full bg-[var(--color-bg-mid)] hover:bg-[var(--color-bg-mid)]/80 text-white border border-[var(--color-gold)] font-sans text-xs tracking-[0.25em] py-4 uppercase font-medium transition-colors cursor-pointer"
                >
                  REQUEST APPOINTMENT SECUREMENT
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Coordinates & Salon listings */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="font-sans text-[0.65rem] tracking-[0.25em] text-[var(--color-gold)] uppercase block mb-1">
                Atelier coordinates
              </span>
              <h2 className="font-serif text-3xl font-light text-white uppercase mb-6">
                THE PHYSICAL SALONS
              </h2>

              <div className="space-y-6">
                {boutiques.map((bt) => (
                  <div
                    key={bt.city}
                    className="border border-[var(--color-gold)]/10 bg-[var(--color-bg-dark)]/50 p-6 space-y-3"
                  >
                    <h3 className="font-serif text-lg text-[var(--color-gold)] uppercase tracking-wide">
                      {bt.city}
                    </h3>
                    <div className="font-sans text-xs text-[var(--color-text-muted)] space-y-1.5 font-light leading-relaxed">
                      <p className="flex items-start gap-1.5">
                        <MapPin size={14} className="text-[var(--color-gold)] shrink-0 mt-0.5" />
                        <span>{bt.address}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone size={14} className="text-[var(--color-gold)] shrink-0" />
                        <span>{bt.phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Mail size={14} className="text-[var(--color-gold)] shrink-0" />
                        <span>{bt.email}</span>
                      </p>
                      <div className="flex items-start gap-1.5">
                        <Clock size={14} className="text-[var(--color-gold)] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          {bt.hours.map((hr, idx) => (
                            <span key={idx} className="block">{hr}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal Mock Vector Map frame */}
            <div className="relative aspect-video bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/15 overflow-hidden flex flex-col items-center justify-center p-4 shadow-2xl">
              <span className="absolute inset-0 bg-radial-gradient from-black/2C to-transparent opacity-60 pointer-events-none"></span>
              {/* Fake abstract visual vector lines representing street structures */}
              <svg className="absolute inset-0 w-full h-full opacity-10 text-[var(--color-gold)]" stroke="currentColor">
                <line x1="10%" y1="0%" x2="10%" y2="100%" />
                <line x1="40%" y1="0%" x2="40%" y2="100%" />
                <line x1="75%" y1="0%" x2="75%" y2="100%" />
                <line x1="0%" y1="30%" x2="100%" y2="30%" />
                <line x1="0%" y1="70%" x2="100%" y2="70%" />
              </svg>
              
              <div className="text-center relative z-10 space-y-2">
                <span className="font-sans text-[8px] tracking-[0.25em] text-[var(--color-gold)] uppercase block">
                  SAT COORD INBOUND
                </span>
                <p className="font-serif text-sm text-[var(--color-text)] italic">
                  Rue du Rhône 42, 1204 Geneva, CH
                </p>
                <div className="w-2.5 h-2.5 bg-[var(--color-gold)] rounded-full animate-ping mx-auto"></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
