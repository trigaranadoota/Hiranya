/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { NewsletterModal } from "./components/NewsletterModal";

// Import all pages
import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { CollectionSpecies } from "./pages/CollectionSpecies";
import { ProductDetail } from "./pages/ProductDetail";
import { ConservationImpact } from "./pages/ConservationImpact";
import { Bespoke } from "./pages/Bespoke";
import { HouseStory } from "./pages/HouseStory";
import { Journal } from "./pages/Journal";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Account } from "./pages/Account";
import { Wishlist } from "./pages/Wishlist";
import { Search } from "./pages/Search";
import { Contact } from "./pages/Contact";
import { Legal } from "./pages/Legal";

// Scroll restoration helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text)] font-sans antialiased overflow-x-hidden selection:bg-[var(--color-gold)] selection:text-[var(--color-bg-primary)]">
          {/* Main Navigation */}
          <Navigation />

          {/* Render Active Page Content */}
          <main className="flex-grow">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Collections & PDP */}
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:species" element={<CollectionSpecies />} />
              <Route path="/collections/:species/:product" element={<ProductDetail />} />

              {/* Conservation Portal */}
              <Route path="/conservation/impact" element={<ConservationImpact />} />
              <Route path="/conservation/partners" element={<ConservationImpact />} />

              {/* Bespoke commissions */}
              <Route path="/bespoke" element={<Bespoke />} />
              <Route path="/bespoke/enquiry" element={<Bespoke />} />

              {/* About / The House */}
              <Route path="/the-house/story" element={<HouseStory />} />
              <Route path="/the-house/craftspeople" element={<HouseStory />} />

              {/* Journal */}
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:slug" element={<Journal />} />

              {/* Cart, Checkout, Wishlist, Account, Search, Contact */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Account />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />

              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<Legal />} />
              <Route path="/terms-of-use" element={<Legal />} />

              {/* Fallback back home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Main Footer */}
          <Footer />

          {/* Utilities Popup & Banner */}
          <CookieBanner />
          <NewsletterModal />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
