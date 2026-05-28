/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Disc } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="main-footer" className="bg-[var(--color-bg-dark)] text-[var(--color-text)] relative pt-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <hr className="bg-[var(--color-gold)] opacity-30 mb-12" />

        {/* 4-column footer body */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          
          {/* Col 1: Brand & Logo */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-serif text-2.5xl tracking-[0.2em] uppercase text-[var(--color-text)]">
              WILDCRAFT
            </h3>
            <p className="font-serif text-[1rem] italic text-[var(--color-text-muted)] leading-relaxed">
              \"A percentage of every fine jewelry sale is directly allocated to fund elite ranger patrol forces and restore crucial animal habitats worldwide.\"
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                <Youtube size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter / X"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                <Twitter size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://pinterest.com"
                aria-label="Pinterest"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                <Disc size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Col 2: Care & Service */}
          <div className="flex flex-col space-y-4">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
              Wildcraft Care
            </span>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <Link to="/contact" className="hover:text-[var(--color-gold)] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-[var(--color-gold)] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/ring-sizing" className="hover:text-[var(--color-gold)] transition-colors">
                  Ring Sizing Guide
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[var(--color-gold)] transition-colors">
                  FAQs & Assistance
                </Link>
              </li>
              <li>
                <Link to="/contact?book=true" className="hover:text-[var(--color-gold)] transition-colors font-medium text-[var(--color-text)]">
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: The House */}
          <div className="flex flex-col space-y-4">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
              The House
            </span>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <Link to="/the-house/story" className="hover:text-[var(--color-gold)] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/the-house/craftspeople" className="hover:text-[var(--color-gold)] transition-colors">
                  Craftspeople & Workshop
                </Link>
              </li>
              <li>
                <Link to="/conservation/impact" className="hover:text-[var(--color-gold)] transition-colors">
                  Stewardship & Carbon Neutrality
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[var(--color-gold)] transition-colors">
                  Careers at the House
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-[var(--color-gold)] transition-colors">
                  Press & Media Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
              Join the Protection
            </span>
            <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed">
              Receive private briefings on conservation advancements, collection previews, and personal invitations to digital boutique salons.
            </p>
            {subscribed ? (
              <p className="font-serif text-sm text-[var(--color-gold-light)] italic">
                Thank you for taking up the protection vow. Watch your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-[var(--color-gold)]/40 text-[var(--color-text)] placeholder-[var(--color-text-muted)]/50 px-4 py-2.5 text-xs font-sans tracking-wider focus:outline-none focus:border-[var(--color-gold-light)]"
                />
                <button
                  type="submit"
                  className="bg-[var(--color-bg-mid)] hover:bg-[var(--color-bg-mid)]/80 text-[var(--color-text)] font-sans text-[0.65rem] uppercase tracking-[0.25em] py-2.5 transition-colors border border-[var(--color-gold)]/50 hover:border-[var(--color-gold)] font-medium cursor-pointer"
                >
                  SUBSCRIBE TO BULLETIN
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-[#150800] py-6 border-t border-[var(--color-gold)]/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2 text-[11px] text-[var(--color-text-muted)]">
            <span className="text-[var(--color-gold)]">●</span>
            <select className="bg-transparent border-0 text-[var(--color-text-muted)] focus:outline-none font-sans cursor-pointer focus:text-[var(--color-gold)]">
              <option value="INT" className="bg-[var(--color-bg-dark)]">International Maison (USD)</option>
              <option value="UK" className="bg-[var(--color-bg-dark)]">United Kingdom (GBP)</option>
              <option value="EU" className="bg-[var(--color-bg-dark)]">Europe (EUR)</option>
              <option value="CH" className="bg-[var(--color-bg-dark)]">Switzerland (CHF)</option>
            </select>
          </div>

          <div className="font-sans text-[11px] text-[var(--color-text-muted)] text-center">
            &copy; {new Date().getFullYear()} WILDCRAFT SA. All rights reserved.
          </div>

          <div className="flex space-x-4 text-[11px] text-[var(--color-text-muted)]">
            <Link to="/privacy" className="hover:text-[var(--color-gold)] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link to="/terms-of-use" className="hover:text-[var(--color-gold)] transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
