/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Shield, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";
import { products } from "../data";
import { SEO } from "../components/SEO";

export const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, cartCount } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Contact/Shipping, 2: Payment, 3: Confirmation
  
  // Shipping states
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Switzerland"
  });

  // Payment states
  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // Submit finished, clear bag
    clearCart();
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)] text-left">
      <SEO title="SECURE CHECKOUT" description="Finalize your luxury fine jewelry commission and support critical habitats worldwide." />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Step Indicator Headers */}
        <div className="flex items-center justify-between border-b border-[var(--color-gold)]/10 pb-6 mb-12">
          <div>
            <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
              Atelier Checkout
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-text)] uppercase font-light">
              {step === 3 ? "COMMISSION SECURED" : "SECURE CHECKOUT"}
            </h1>
          </div>

          {step < 3 && (
            <div className="flex items-center space-x-4 md:space-x-8 text-[10px] md:text-xs tracking-widest uppercase">
              <span className={`pb-2 ${step >= 1 ? "text-[var(--color-gold)] border-b border-[var(--color-gold)]" : "text-[var(--color-text-muted)]"}`}>
                1. Shipping
              </span>
              <span className={`pb-2 ${step >= 2 ? "text-[var(--color-gold)] border-b border-[var(--color-gold)]" : "text-[var(--color-text-muted)]"}`}>
                2. Payment
              </span>
            </div>
          )}
        </div>

        {step === 3 ? (
          /* STEP 3: CONFIRMATION */
          <div className="text-center py-16 space-y-6 max-w-xl mx-auto bg-[var(--color-bg-dark)] border border-[var(--color-gold)] p-8 md:p-12 gold-glow">
            <CheckCircle size={48} className="text-[var(--color-gold)] mx-auto" />
            <h2 className="font-serif text-3.5xl text-white">Commission Confirmed</h2>
            <p className="font-sans text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
              We have received your custom jewelry credentials. Your certified Stewardship Ledger and secure armored delivery schedule has been assigned. Expect custom direct confirmations in your inbox within 1 hour.
            </p>
            <div className="border-t border-[var(--color-gold)]/15 pt-6 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider text-left space-y-1">
              <p>Delivery Client: {shipping.name}</p>
              <p>Address: {shipping.address}, {shipping.city}</p>
              <p>Delivery Type: Armored Insured Courier (Complimentary)</p>
            </div>
            <div className="pt-6">
              <Link
                to="/"
                className="border border-[var(--color-gold)] text-white font-sans text-xs tracking-widest uppercase py-3.5 px-8 hover:bg-[var(--color-bg-mid)] transition-colors inline-block"
              >
                RETURN TO HOME
              </Link>
            </div>
          </div>
        ) : (
          /* MAIN CHECKOUT FRAME */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT 60%: Dynamic Form fields */}
            <div className="lg:col-span-7 bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/15 p-6 md:p-10 text-left">
              {step === 1 ? (
                /* STEP 1 FORM: SHIPPING */
                <form onSubmit={handleGoToPayment} className="space-y-6">
                  <h2 className="font-serif text-2xl text-[var(--color-text)] mb-6 border-b border-[var(--color-gold)]/10 pb-2">
                    1. Deliver Address
                  </h2>
                  
                  <div className="space-y-2 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="name">Full Recipient Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={shipping.name}
                      onChange={handleShippingChange}
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={shipping.email}
                        onChange={handleShippingChange}
                        className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                      />
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="phone">Contact Phone *</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        required
                        value={shipping.phone}
                        onChange={handleShippingChange}
                        className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="address">Steward Residence Address *</label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      required
                      value={shipping.address}
                      onChange={handleShippingChange}
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 flex flex-col md:col-span-2">
                      <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="city">City / State *</label>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        required
                        value={shipping.city}
                        onChange={handleShippingChange}
                        className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                      />
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="postalCode">Postal Code *</label>
                      <input
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        required
                        value={shipping.postalCode}
                        onChange={handleShippingChange}
                        className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={shipping.country}
                      onChange={handleShippingChange}
                      className="bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] cursor-pointer"
                    >
                      <option value="Switzerland">Switzerland</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>

                  <button
                    id="submit-shipping-btn"
                    type="submit"
                    className="w-full bg-[var(--color-bg-mid)] hover:bg-[var(--color-bg-mid)]/80 text-white font-sans text-xs tracking-[0.2em] py-4 uppercase font-medium border border-[var(--color-gold)]/50 cursor-pointer"
                  >
                    PROCEED TO INSURED PAYMENT
                  </button>
                </form>
              ) : (
                /* STEP 2 FORM: PAYMENT */
                <form onSubmit={handleCompleteOrder} className="space-y-6">
                  <h2 className="font-serif text-2xl text-[var(--color-text)] mb-6 border-b border-[var(--color-gold)]/10 pb-2 flex justify-between items-baseline">
                    <span>2. Insured Vault Transaction</span>
                    <button
                      id="edit-shipping-btn"
                      type="button"
                      onClick={() => setStep(1)}
                      className="font-sans text-[10px] tracking-widest text-[var(--color-gold)] uppercase underline"
                    >
                      Edit Delivery Info
                    </button>
                  </h2>

                  <div className="space-y-2 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cardName">Cardholder Name *</label>
                    <input
                      id="cardName"
                      type="text"
                      name="cardName"
                      required
                      value={payment.cardName}
                      onChange={handlePaymentChange}
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)]"
                    />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cardNumber">Credit Card Number *</label>
                    <input
                      id="cardNumber"
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="4000 1234 5678 9010"
                      value={payment.cardNumber}
                      onChange={handlePaymentChange}
                      className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] placeholder-gray-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="expiry">Expiry MM/YY *</label>
                      <input
                        id="expiry"
                        type="text"
                        name="expiry"
                        required
                        placeholder="12/28"
                        value={payment.expiry}
                        onChange={handlePaymentChange}
                        className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] placeholder-gray-700"
                      />
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label className="font-sans text-[9px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase" htmlFor="cvv">CVV *</label>
                      <input
                        id="cvv"
                        type="password"
                        name="cvv"
                        required
                        maxLength={4}
                        placeholder="•••"
                        value={payment.cvv}
                        onChange={handlePaymentChange}
                        className="bg-transparent border border-[var(--color-gold)]/30 text-white font-sans text-xs p-3 focus:outline-none focus:border-[var(--color-gold-light)] placeholder-gray-700"
                      />
                    </div>
                  </div>

                  <div className="bg-[var(--color-bg-primary)]/50 border border-[var(--color-gold)]/20 p-4 text-xs font-sans text-[var(--color-text-muted)] leading-relaxed flex gap-3">
                    <Shield size={18} className="text-[var(--color-gold)] shrink-0 mt-0.5" />
                    <span>
                      Transactions undergo secure SSL bank hashing protocols and visual identity vetting prior to credit authorization.
                    </span>
                  </div>

                  <button
                    id="checkout-finalize-btn"
                    type="submit"
                    className="w-full bg-[var(--color-bg-mid)] hover:bg-[var(--color-bg-mid)]/80 text-white font-sans text-xs tracking-[0.2em] py-4 uppercase font-medium border border-[var(--color-gold)] cursor-pointer"
                  >
                    AUTHORIZE VAULT TRANSACTION (${cartTotal.toLocaleString()})
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT 40%: Checkout Order Summary */}
            <div className="lg:col-span-5 bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/20 p-6 space-y-6 text-left relative z-10">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-1">
                Receipt Order Summary
              </span>

              {cart.length === 0 ? (
                <div className="py-4 text-center text-xs text-[var(--color-text-muted)] italic">
                  Bag empty. Returning to Home.
                </div>
              ) : (
                <div className="space-y-4 max-h-72 overflow-y-auto pr-2 divide-y divide-[var(--color-gold)]/10">
                  {cart.map((item) => {
                    const prod = products.find((p) => p.id === item.productId);
                    if (!prod) return null;
                    return (
                      <div key={item.id} className="flex gap-4 pt-3 text-xs justify-between items-center text-left">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-14 object-cover border border-[var(--color-gold)]/15 filter brightness-90 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="grow space-y-0.5 ml-2">
                          <h4 className="font-serif text-[13px] text-white line-clamp-1">{prod.name}</h4>
                          <span className="font-sans text-[9px] text-[var(--color-text-muted)] block uppercase">
                            Qty: {item.quantity} · Size: {item.size}
                          </span>
                        </div>
                        <span className="font-serif text-[13px] text-[var(--color-gold)]">${(prod.price * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="border-t border-[var(--color-gold)]/15 pt-4 space-y-2 text-xs tracking-wider uppercase text-[var(--color-text-muted)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="text-white">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-[var(--color-gold)]">
                  <span>PLEDGE PORTION (10%)</span>
                  <span>${(cartTotal * 0.1).toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-[var(--color-gold)]/15 pt-4 flex justify-between items-baseline">
                <span className="font-serif text-lg text-[var(--color-text-muted)]">Invoice Total</span>
                <span className="font-serif text-2xl text-[var(--color-gold)]">${cartTotal.toLocaleString()}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
