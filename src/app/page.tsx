"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  return (
    <>
      <Hero />

      {/* Categories Section */}
      <section id="categories" className="py-16 md:py-24 bg-brand-bg relative overflow-hidden scroll-mt-24">
        {/* Decorative clothing pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] bg-[url('/images/hero.jpg')] bg-cover bg-top mix-blend-multiply pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-brand-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Stitched Collections</p>
            <h2 className="section-title">Our Collections</h2>
            <p className="section-subtitle mx-auto">
              Explore curated categories of handcrafted Pakistani stitched clothing
              for every occasion.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section id="collection" className="py-16 md:py-24 bg-brand-light relative overflow-hidden scroll-mt-24">
        {/* Decorative accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary/20 via-brand-accent/30 to-brand-primary/20" />
        {/* Decorative clothing pattern */}
        <div className="absolute bottom-0 left-0 w-1/4 h-full opacity-[0.03] bg-[url('/images/hero.jpg')] bg-cover bg-bottom mix-blend-multiply pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-brand-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Handpicked Picks</p>
            <h2 className="section-title">Featured Collection</h2>
            <p className="section-subtitle mx-auto">
              Handpicked selections from our latest stitched designs.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-brand-light bg-white text-brand-dark placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all duration-300 text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-brand-primary text-white shadow-md"
                      : "bg-white text-brand-dark/70 border border-brand-light hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-brand-muted text-lg">No products found</p>
              <p className="text-brand-muted/70 text-sm mt-1">
                Try a different category or search term
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
