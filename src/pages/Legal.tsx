/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useLocation } from "react-router-dom";
import { ShieldAlert, FileText, Scale } from "lucide-react";
import { SEO } from "../components/SEO";

export const Legal: React.FC = () => {
  const { pathname } = useLocation();

  // Determine current legal document structure based on URL path
  let docTitle = "MAISON INTELLECTUAL PROPERTY";
  let docDesc = "Wildcraft regulatory legal updates and copyright disclosures in Geneva, Switzerland.";
  let docContent = (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-white font-light">1. Trademark Disclosures</h2>
      <p>
        The visual branding, literal names, geometric species illustrations, custom font layouts, and trademarked designations of "WILDCRAFT" stand exclusively protected under Swiss intellectual property registries.
      </p>
      <h2 className="font-serif text-2xl text-white font-light">2. Artistic Reproductions</h2>
      <p>
        Reproductions of our collections, custom wax sketching, 3D articulation prints, or unique digital models without explicit authorization from Wildcraft directors is strictly penalized by legal limits.
      </p>
    </div>
  );

  if (pathname.includes("privacy")) {
    docTitle = "PRIVACY POLICY";
    docDesc = "Audited personal privacy security procedures at Wildcraft high salons.";
    docContent = (
      <div className="space-y-6 text-xs md:text-sm">
        <h2 className="font-serif text-2xl text-white font-light">1. Information We Secure</h2>
        <p>
          We secure client ledger details, contact phone structures, shipping coordinates, and transaction histories exclusively to fulfill armored deliveries, coordinate viewing salon appointments, or dispatch certificates of authenticity.
        </p>
        <p>
          Your financial transactions undergo bank end-to-end hashes and never rest on private Wildcraft databases.
        </p>
        <h2 className="font-serif text-2xl text-white font-light">2. Absolute Confidences</h2>
        <p>
          Wildcraft maintains absolute patron confidentiality. We never lease, vend, or share contact lists or saved credentials with secondary market organizations or unauthorized third-party agencies.
        </p>
      </div>
    );
  } else if (pathname.includes("terms")) {
    docTitle = "TERMS OF USE";
    docDesc = "Maison salon governance and credit transactions regulatory protocols.";
    docContent = (
      <div className="space-y-6 text-xs md:text-sm">
        <h2 className="font-serif text-2xl text-white font-light">1. Transaction Governance</h2>
        <p>
          By engaging in customized Bespoke commissions or collection catalog shopping bags, you represent standard civil compliance, bank verification, and authorization of the designated transaction totals.
        </p>
        <h2 className="font-serif text-2xl text-white font-light">2. Armored Deliveries</h2>
        <p>
          Armored deliveries must be received in person by the specified custom clients, who must provide valid identification mirroring shipping dossier records.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)] text-left">
      <SEO title={docTitle} description={docDesc} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        
        {/* Header section */}
        <div className="border-b border-[var(--color-gold)]/10 pb-6 mb-12">
          <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-1">
            Audits & Governance
          </span>
          <h1 className="font-serif text-3.5xl md:text-5xl text-white uppercase font-light">
            {docTitle}
          </h1>
          <p className="font-sans text-[10px] text-[var(--color-text-muted)] mt-1 uppercase">
            Effective: May 2026 · Geneva Jurisdictions
          </p>
        </div>

        {/* Clauses paper */}
        <div className="font-sans text-sm text-[var(--color-text-muted)] leading-[1.8] space-y-8 font-light max-w-3xl">
          {docContent}
          
          <div className="border-t border-[var(--color-gold)]/15 pt-8 mt-12 flex items-center gap-3 text-xs tracking-wider uppercase">
            <Scale size={16} className="text-[var(--color-gold)] shrink-0" />
            <span>GENEVA GENERAL AUDITED COMPLIANCE, SWITZERLAND</span>
          </div>
        </div>

      </div>
    </div>
  );
};
