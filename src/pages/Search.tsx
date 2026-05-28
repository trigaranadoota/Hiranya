/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Eye } from "lucide-react";
import { products, collections } from "../data";
import { SEO } from "../components/SEO";

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  // Filter products by searching term
  const results = products.filter((prod) => {
    const collName = collections.find((c) => c.id === prod.collectionId)?.name || "";
    return (
      prod.name.toLowerCase().includes(queryParam.toLowerCase()) ||
      prod.materials.toLowerCase().includes(queryParam.toLowerCase()) ||
      prod.stone.toLowerCase().includes(queryParam.toLowerCase()) ||
      collName.toLowerCase().includes(queryParam.toLowerCase())
    );
  });

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg-primary)] text-left">
      <SEO title="CATALOG DISCOVERY" description="Query HIRANYA's Geneva deep inventory for custom rings, necklaces, and wildlife-aligned bracelets." />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Search Header Form input */}
        <div className="border-b border-[var(--color-gold)]/10 pb-10 mb-12 max-w-2xl text-left">
          <span className="font-sans text-[0.65rem] tracking-[0.3em] text-[var(--color-gold)] uppercase block mb-2">
            Dynamic Searching
          </span>
          <h1 className="font-serif text-3.5xl md:text-5xl text-white uppercase font-light mb-6">
            CATALOG DISCOVERY
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <input
              id="search-input-field"
              type="text"
              placeholder="Search by collection, diamond, gold size, emerald..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-gold)]/30 text-white font-sans text-xs p-4 pr-12 focus:outline-none focus:border-[var(--color-gold-light)] focus:ring-1 focus:ring-[var(--color-gold-light)]"
            />
            <button
              id="search-input-btn"
              type="submit"
              className="absolute right-4 text-[var(--color-text-muted)] hover:text-white cursor-pointer"
            >
              <SearchIcon size={16} />
            </button>
          </form>
        </div>

        {/* Search Results Display */}
        {queryParam ? (
          <div>
            <div className="font-sans text-[10px] tracking-[0.15em] text-[var(--color-text-muted)] uppercase mb-8">
              Found {results.length} result(s) for "{queryParam}"
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 bg-[var(--color-bg-dark)]/30 border border-[var(--color-gold)]/10">
                <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
                  Zero items matched your specific parameters.
                </p>
                <button
                  id="reset-search-btn"
                  onClick={() => setSearchParams({ q: "" })}
                  className="font-sans text-[10px] tracking-[0.15em] text-[var(--color-gold)] uppercase underline mt-4 cursor-pointer"
                >
                  Clear search term
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((prod) => {
                  const coll = collections.find((c) => c.id === prod.collectionId);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => navigate(`/collections/${prod.collectionId}/${prod.id}`)}
                      className="group relative bg-[var(--color-bg-dark)]/40 border border-[var(--color-gold)]/15 hover:border-[var(--color-gold)] p-3 cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-xl"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-black">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-85 group-hover:scale-103 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-2 px-1 text-left">
                        <span className="font-sans text-[8px] tracking-[0.15em] text-[var(--color-gold)] uppercase block">
                          {coll?.name.replace("The ", "") || "Maison"}
                        </span>
                        <h3 className="font-serif text-lg text-white font-light line-clamp-1">{prod.name}</h3>
                        <div className="flex items-center justify-between border-t border-[var(--color-gold)]/10 pt-2 text-[10px] uppercase font-sans tracking-wide">
                          <span className="text-[var(--color-text-muted)]">${prod.price.toLocaleString()}</span>
                          <span className="text-[var(--color-gold)] font-medium tracking-widest flex items-center gap-1">
                            EXPLORE →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Neutral state: show trending collections or terms */
          <div className="space-y-8 max-w-xl text-left">
            <h3 className="font-serif text-xl text-[var(--color-text-muted)] italic">Trending curation terms:</h3>
            <div className="flex flex-wrap gap-2.5">
              {["Leopard", "Emerald", "Ring", "Platinum", "Pangolin", "Pledge", "Rhino"].map((term) => (
                <button
                  key={term}
                  id={`trend-btn-${term}`}
                  onClick={() => setSearchParams({ q: term })}
                  className="font-sans text-[10px] tracking-widest uppercase px-4 py-2 border border-[var(--color-gold)]/20 text-[var(--color-text-muted)] hover:border-[var(--color-gold)] hover:text-white cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
