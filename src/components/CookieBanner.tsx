/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("wildcraft_cookie_consent");
    if (!consent) {
      // Show after 1.5 seconds
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("wildcraft_cookie_consent", "accepted");
    setVisible(false);
  };

  const handleManage = () => {
    localStorage.setItem("wildcraft_cookie_consent", "managed");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="cookie-consent-banner"
          className="fixed bottom-0 left-0 w-full bg-[var(--color-bg-dark)] border-t border-[var(--color-gold)]/30 text-[var(--color-text)] z-50 py-5 px-6 md:px-12 shadow-2xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="font-sans text-xs tracking-wide leading-relaxed text-[var(--color-text-muted)]">
                Our digital Maison use cookies to optimize styling, measure stewardship engagement, and tailor fine catalogs. By closing this banner, you align with our continuous experience guide.
              </p>
            </div>
            <div className="flex items-center space-x-4 shrink-0">
              <button
                id="cookie-manage-btn"
                onClick={handleManage}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] hover:text-white transition-colors py-2 px-4 border border-transparent"
              >
                Manage Preferences
              </button>
              <button
                id="cookie-accept-btn"
                onClick={handleAccept}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-text)] hover:text-black hover:bg-[var(--color-text)] transition-all py-2.5 px-6 border border-[var(--color-gold)]"
              >
                ACCEPT ALL
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
