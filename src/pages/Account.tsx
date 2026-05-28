/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, Award, User, ShoppingBag, MapPin, Key } from "lucide-react";
import { SEO } from "../components/SEO";

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orders");

  // Mock order histories
  const orders = [
    { id: "WC-9391", date: "April 18, 2026", total: "$12,400", items: "Pangolin Shield Ring (US 7, Yellow Gold)", status: "Delivered", courier: "Secure Armored #41", impact: "$1,240 allocated to Wildlife Alliance" },
    { id: "WC-8524", date: "Jan 12, 2025", total: "$6,800", items: "Himalayan Snow Leopard Solitaire (US 6, Platinum)", status: "Delivered", courier: "Secure Armored #12", impact: "$680 allocated to Panthera Organization" }
  ];

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)] text-left">
      <SEO title="YOUR STEWARD MEMBERSHIP" description="Access saved orders, delivery archives, and your custom Wildlife conservation ledger." />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Header banner */}
        <div className="border-b border-[var(--color-gold)]/10 pb-6 mb-12">
          <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
            Maison Registry
          </span>
          <h1 className="font-serif text-3.5xl md:text-5xl text-white uppercase font-light">
            STEWARD PROFILE
          </h1>
          <p className="font-sans text-[11px] text-[var(--color-text-muted)] tracking-wider mt-1 uppercase">
            Client ID: WC-004128 · Status: Elite Conservation Patron
          </p>
        </div>

        {/* Tab switcher layout: Left navigation (1/4), Right contents (3/4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fadeIn">
          
          {/* Left panel tabs links */}
          <div className="lg:col-span-3 space-y-2 bg-[var(--color-bg-dark)]/80 border border-[var(--color-gold)]/15 p-6 shadow-xl leading-none">
            <button
              id="acc-tab-orders"
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left font-sans text-xs tracking-wider uppercase p-3 border-l-2 cursor-pointer transition-colors block ${
                activeTab === "orders" ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-bg-primary)]/45" : "border-transparent text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              Order Chronicles
            </button>
            <button
              id="acc-tab-address"
              onClick={() => setActiveTab("address")}
              className={`w-full text-left font-sans text-xs tracking-wider uppercase p-3 border-l-2 cursor-pointer transition-colors block ${
                activeTab === "address" ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-bg-primary)]/45" : "border-transparent text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              Saved Coordinates
            </button>
            <button
              id="acc-tab-security"
              onClick={() => setActiveTab("security")}
              className={`w-full text-left font-sans text-xs tracking-wider uppercase p-3 border-l-2 cursor-pointer transition-colors block ${
                activeTab === "security" ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-bg-primary)]/45" : "border-transparent text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              Vault Credentials
            </button>
          </div>

          {/* Right panel dynamic screen */}
          <div className="lg:col-span-9 bg-[var(--color-bg-dark)]/40 border border-[var(--color-gold)]/15 p-6 md:p-8 min-h-[320px] shadow-2xl">
            {activeTab === "orders" && (
              <div id="account-orders-panel" className="space-y-6">
                <h2 className="font-serif text-2xl text-white font-light border-b border-[var(--color-gold)]/10 pb-2">
                  Steward Order Chronicles
                </h2>
                
                {orders.length === 0 ? (
                  <p className="font-serif text-sm italic text-[var(--color-text-muted)]">
                    No orders have been recorded against this stewardship profile yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="border border-[var(--color-gold)]/15 bg-[var(--color-bg-dark)]/85 p-6 text-xs text-[var(--color-text-muted)] space-y-3"
                      >
                        <div className="flex flex-wrap justify-between items-baseline border-b border-[var(--color-gold)]/10 pb-2 text-xs uppercase tracking-wider">
                          <span className="font-serif text-sm font-semibold text-white">Order Reference: {ord.id}</span>
                          <span className="font-sans text-[10px] text-[var(--color-text-muted)]">{ord.date}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                          <div className="space-y-1 py-1">
                            <span className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-gold)] uppercase block">Client Items</span>
                            <span className="text-[var(--color-text)] block text-sm font-serif">{ord.items}</span>
                          </div>
                          <div className="space-y-1 py-1">
                            <span className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-gold)] uppercase block">Transaction Total</span>
                            <span className="text-white block text-sm font-serif">{ord.total}</span>
                          </div>
                        </div>

                        <div className="border-t border-[var(--color-gold)]/10 pt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-[10px] uppercase tracking-wider font-sans">
                          <div>
                            Status: <span className="text-[var(--color-gold-light)] font-semibold">{ord.status}</span> ({ord.courier})
                          </div>
                          <div className="text-[var(--color-gold)] font-medium md:text-right italic">
                            {ord.impact}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "address" && (
              <div id="account-address-panel" className="space-y-6">
                <h2 className="font-serif text-2xl text-white font-light border-b border-[var(--color-gold)]/10 pb-2">
                  Saved Delivery Coordinates
                </h2>
                
                <div className="border border-[var(--color-gold)]/15 p-6 bg-[var(--color-bg-dark)] max-w-md text-xs text-[var(--color-text-muted)] space-y-4">
                  <div className="flex justify-between items-center border-b border-[var(--color-gold)]/10 pb-2">
                    <span className="font-serif text-sm font-semibold text-white">Primary Residence</span>
                    <span className="font-sans text-[8px] tracking-[0.2em] bg-[var(--color-gold)]/10 text-[var(--color-gold)] px-2 py-0.5 uppercase">Default</span>
                  </div>
                  <div className="space-y-1 text-sm font-light leading-relaxed">
                    <p className="text-white font-serif font-semibold">Lady Margaret V.</p>
                    <p>Via Nassa 41</p>
                    <p>Lugano, 6900</p>
                    <p>Switzerland</p>
                    <p>Phone: +41 91 859 21 00</p>
                  </div>
                  <div className="pt-3 border-t border-[var(--color-gold)]/10 flex justify-between font-sans text-[10px] tracking-wider uppercase text-[var(--color-gold)]">
                    <button className="hover:underline cursor-pointer">Edit Credentials</button>
                    <button className="hover:underline cursor-pointer">Remove</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div id="account-security-panel" className="space-y-6">
                <h2 className="font-serif text-2xl text-white font-light border-b border-[var(--color-gold)]/10 pb-2">
                  Vault Credentials
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); alert("Vault password changed safely."); }} className="space-y-4 max-w-md text-left">
                  <div className="space-y-1.5 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="current-pass">Current Password</label>
                    <input
                      id="current-pass"
                      type="password"
                      required
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold)]"
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="new-pass">New Password</label>
                    <input
                      id="new-pass"
                      type="password"
                      required
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold)]"
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="confirm-pass">Confirm New Password</label>
                    <input
                      id="confirm-pass"
                      type="password"
                      required
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold)]"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      id="account-update-pass-btn"
                      type="submit"
                      className="border border-[var(--color-gold)] text-white font-sans text-xs tracking-widest uppercase py-3.5 px-8 hover:bg-[var(--color-bg-mid)] transition-colors cursor-pointer"
                    >
                      UPDATE PASSWORD
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
