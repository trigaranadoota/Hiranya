/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { collections } from "../data";

export const Navigation: React.FC = () => {
  const { cartCount, wishlistCount } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setSearchActive(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localSearchQuery.trim())}`);
      setSearchActive(false);
      setLocalSearchQuery("");
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-[var(--color-gold)]/20 ${
          isScrolled
            ? "bg-[var(--color-bg-dark)]/85 backdrop-blur-xl"
            : "bg-[var(--color-bg-dark)]"
        }`}
      >
        {/* TOP ROW: Brand Name */}
        <div className={`relative flex items-center justify-center transition-all duration-500 w-full ${isScrolled ? "py-4" : "py-6"}`}>
          {/* Mobile Menu Hamburger */}
          <div className="absolute left-6 md:left-12 lg:hidden">
            <button
              id="mobile-menu-hamburger"
              aria-label="Toggle Mobile Menu"
              className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Center Logo */}
          <div className="text-center">
            <Link
              to="/"
              id="brand-wordmark"
              className="font-serif text-2xl md:text-3.5xl tracking-[0.3em] font-light text-[var(--color-text)] uppercase block select-none hover:text-[var(--color-gold-light)] transition-colors duration-500"
            >
              Hiranya
            </Link>
          </div>
        </div>

        {/* BOTTOM ROW: Navigation Links and Icons */}
        <div
          className={`w-full overflow-hidden transition-all duration-500 ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100 pb-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* LEFT: Nav Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              <div
                className="relative py-2 group cursor-pointer"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <Link
                  to="/collections"
                  id="nav-link-collections"
                  className="font-sans text-[0.75rem] tracking-[0.2em] text-[var(--color-text)] uppercase hover:text-[var(--color-gold)] transition-colors duration-300"
                >
                  Collections
                </Link>
                {/* Mega Menu Indicator line on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full"></div>
              </div>

              <Link
                to="/conservation/impact"
                id="nav-link-conservation"
                className="font-sans text-[0.75rem] tracking-[0.2em] text-[var(--color-text)] uppercase hover:text-[var(--color-gold)] transition-colors duration-300 relative py-2 group"
              >
                Conservation
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full"></div>
              </Link>

              <Link
                to="/bespoke"
                id="nav-link-bespoke"
                className="font-sans text-[0.75rem] tracking-[0.2em] text-[var(--color-text)] uppercase hover:text-[var(--color-gold)] transition-colors duration-300 relative py-2 group"
              >
                Bespoke
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full"></div>
              </Link>

              <Link
                to="/the-house/story"
                id="nav-link-house"
                className="font-sans text-[0.75rem] tracking-[0.2em] text-[var(--color-text)] uppercase hover:text-[var(--color-gold)] transition-colors duration-300 relative py-2 group"
              >
                The House
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>

            {/* RIGHT: Quick Icons */}
            <div className="flex items-center space-x-5 md:space-x-6 ml-auto lg:ml-0">
              <button
                id="nav-search-btn"
                aria-label="Open Search"
                onClick={() => setSearchActive(true)}
                className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <Link
                to="/wishlist"
                id="nav-wishlist-link"
                aria-label="Wishlist"
                className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors duration-300 relative"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-gold)] text-[var(--color-bg-dark)] font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                id="nav-cart-link"
                aria-label="Shopping Cart"
                className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors duration-300 relative"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-gold)] text-[var(--color-bg-dark)] font-sans text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/account"
                id="nav-account-link"
                aria-label="My Account"
                className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors duration-300"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* MEGA MENU: Collections Dropdown */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              id="nav-mega-menu"
              className="absolute left-0 top-full w-full bg-[var(--color-bg-dark)] border-b border-[var(--color-gold)]/30 shadow-2xl z-40 hidden lg:block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">
                <div className="col-span-3 grid grid-cols-3 gap-8">
                  <div>
                    <span className="font-sans text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-4 border-b border-[var(--color-gold)]/10 pb-2">
                      Endangered Collections
                    </span>
                    <ul className="space-y-3">
                      {collections.slice(0, 3).map((coll) => (
                        <li key={coll.id}>
                          <Link
                            to={`/collections/${coll.id}`}
                            className="font-serif text-lg text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors block"
                          >
                            {coll.name.replace("The ", "")}
                          </Link>
                          <span className="font-sans text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase block mt-0.5">
                            {coll.scientificName} · {coll.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-sans text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-4 border-b border-[var(--color-gold)]/10 pb-2">
                      Vulnerable Kingdoms
                    </span>
                    <ul className="space-y-3">
                      {collections.slice(3).map((coll) => (
                        <li key={coll.id}>
                          <Link
                            to={`/collections/${coll.id}`}
                            className="font-serif text-lg text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors block"
                          >
                            {coll.name.replace("The ", "")}
                          </Link>
                          <span className="font-sans text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase block mt-0.5">
                            {coll.scientificName} · {coll.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-sans text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-4 border-b border-[var(--color-gold)]/10 pb-2">
                      Maison Craft
                    </span>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/collections?filter=Rings"
                          className="font-sans text-xs tracking-[0.05em] text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors uppercase block"
                        >
                          Rings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections?filter=Necklaces"
                          className="font-sans text-xs tracking-[0.05em] text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors uppercase block"
                        >
                          Necklaces
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections?filter=Earrings"
                          className="font-sans text-xs tracking-[0.05em] text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors uppercase block"
                        >
                          Earrings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/collections?filter=Bracelets"
                          className="font-sans text-xs tracking-[0.05em] text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors uppercase block"
                        >
                          Bracelets & Cuffs
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/collections"
                          className="font-sans text-xs text-[var(--color-gold)] tracking-[0.1em] hover:text-[var(--color-gold-light)] transition-colors uppercase flex items-center"
                        >
                          Discover All Pieces <ChevronRight size={12} className="ml-1" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-span-1 border-l border-[var(--color-gold)]/10 pl-8 flex flex-col justify-between">
                  <div>
                    <span className="font-sans text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-4 border-b border-[var(--color-gold)]/10 pb-2">
                      The Hiranya Vow
                    </span>
                    <p className="font-serif text-sm italic text-[var(--color-text)] leading-relaxed mb-4">
                      \"Fine Jewelry should not exist at the cost of the Earth. We stand as a shield for those without a voice.\"
                    </p>
                    <Link
                      to="/conservation/impact"
                      className="font-sans text-[0.7rem] text-[var(--color-gold)] uppercase tracking-[0.15em] border-b border-[var(--color-gold)] pb-0.5 hover:text-[var(--color-gold-light)]"
                    >
                      Our Stewardship Impact ——
                    </Link>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop&q=80"
                    alt="Featured Craft"
                    className="w-full h-24 object-cover border border-[var(--color-gold)]/30 mt-4 filter brightness-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* FULL PAGE SEARCH DROPDOWN */}
      <AnimatePresence>
        {searchActive && (
          <motion.div
            id="search-overlay"
            className="fixed inset-0 z-50 bg-[var(--color-bg-dark)]/95 backdrop-blur-xl flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              id="close-search-btn"
              onClick={() => setSearchActive(false)}
              className="absolute top-8 right-8 text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors p-2"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl text-center">
              <label htmlFor="search-input" className="font-sans text-[0.75rem] uppercase tracking-[0.3em] text-[var(--color-gold)] mb-4 block">
                Begin Your Stewardship Search
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Search collection, species, gemstones..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-b border-[var(--color-gold)] text-[var(--color-text)] font-serif text-3xl md:text-4xl text-center pb-3 focus:outline-none focus:border-[var(--color-gold-light)] placeholder-[var(--color-text-muted)]/30"
              />
              <p className="font-sans text-[0.65rem] tracking-[0.1em] text-[var(--color-text-muted)] uppercase mt-4">
                Press enter to view matching pieces
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FULL-SCREEN NAVIGATION ACCORDION */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            className="fixed inset-0 z-50 bg-[var(--color-bg-dark)] px-8 py-12 flex flex-col justify-between overflow-y-auto"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header part */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl tracking-[0.2em] text-[var(--color-text)] uppercase font-light">
                HIRANYA
              </span>
              <button
                id="close-mobile-menu"
                className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Middle links part */}
            <div className="my-12 flex flex-col space-y-6">
              {[
                { title: "Collections", path: "/collections" },
                { title: "Conservation", path: "/conservation/impact" },
                { title: "Bespoke Journey", path: "/bespoke" },
                { title: "The House", path: "/the-house/story" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    className="font-serif text-3.5xl md:text-4.5xl text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors block"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              <div className="h-[1px] bg-[var(--color-gold)]/20 w-1/3 my-2"></div>

              <div className="flex flex-col space-y-3">
                <Link
                  to="/cart"
                  className="font-sans text-sm uppercase tracking-[0.15em] text-[var(--color-text-muted)] hover:text-white"
                >
                  Shopping Cart ({cartCount})
                </Link>
                <Link
                  to="/wishlist"
                  className="font-sans text-sm uppercase tracking-[0.15em] text-[var(--color-text-muted)] hover:text-white"
                >
                  Wishlist ({wishlistCount})
                </Link>
                <Link
                  to="/account"
                  className="font-sans text-sm uppercase tracking-[0.15em] text-[var(--color-text-muted)] hover:text-white"
                >
                  My Account
                </Link>
              </div>
            </div>

            {/* Bottom details */}
            <div className="border-t border-[var(--color-gold)]/10 pt-6">
              <p className="font-sans text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] uppercase mb-2">
                10% of every sale directly funds wildlife stewardship
              </p>
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>Geneva · London · New York</span>
                <Link to="/contact" className="underline text-[var(--color-gold)]">
                  Boutique Booking
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
