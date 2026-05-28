/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("wildcraft_has_seen_newsletter");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("wildcraft_has_seen_newsletter", "true");
      }, 8000); // 8 seconds after first visit as requested!
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="newsletter-modal-overlay"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* Backdrop Click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <motion.div
            id="newsletter-modal-dialog"
            className="relative bg-[var(--color-bg-primary)] border border-[var(--color-gold)] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              id="newsletter-modal-close"
              aria-label="Close Modal"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Content */}
            <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-3">
              Maison Bulletin
            </span>

            <h2 className="font-serif text-3.5xl md:text-4.5xl text-[var(--color-text)] italic mb-4 font-light leading-tight">
              Protect Something Beautiful
            </h2>

            <p className="font-sans text-xs text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-sm mx-auto">
              Engage with our legacy conservation programs. Every collection protects an endangered kingdom. Receive curated updates regarding active wildlife releases.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif text-[1.1rem] text-[var(--color-gold)] italic py-4"
              >
                Welcome to the stewardship community.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Your personal email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-[var(--color-gold)]/40 text-[var(--color-text)] placeholder-[var(--color-text-muted)]/50 px-4 py-3 text-xs font-sans tracking-widest text-center focus:outline-none focus:border-[var(--color-gold-light)]"
                />
                <button
                  type="submit"
                  className="bg-[var(--color-bg-mid)] hover:bg-[var(--color-bg-mid)]/80 text-[var(--color-text)] font-sans text-xs uppercase tracking-[0.2em] py-3.5 transition-all border border-[var(--color-gold)] hover:border-[var(--color-gold-light)] cursor-pointer"
                >
                  SUBSCRIBE & ALIGN
                </button>
              </form>
            )}

            <p className="font-sans text-[9px] tracking-[0.05em] text-[var(--color-text-muted)]/60 uppercase mt-6">
              Complimentary Shipping on first stewardship commission
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
