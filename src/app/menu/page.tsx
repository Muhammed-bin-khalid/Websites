"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useCart, CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import config from "../../../business-config";

function MenuContent() {
  const { categories, mode } = config.sections.menu;
  const { addItem, cart } = useCart();
  const categoryKeys = Object.keys(categories);
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0] || "");

  const isItemInCart = (id: string) => cart.some((item) => item.id === id);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            {mode === 'restaurant' ? 'Authentic Flavors' : 'Our Offerings'}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary">
            {mode === 'restaurant' ? 'Full Menu' : 'Services & Pricing'}
          </h1>
          <p className="text-stone-600 text-lg">
            {mode === 'restaurant'
              ? 'Explore our full selection of freshly prepared dishes, crafted with traditional recipes.'
              : 'Browse our complete list of services designed to meet your needs.'}
          </p>
        </div>

        {/* Category Tabs */}
        {categoryKeys.length > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mb-16">
            {categoryKeys.map((key) => {
              const cat = categories[key];
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                      : "bg-white text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Category Display */}
        {activeCategory && categories[activeCategory] && (
          <div className="space-y-8">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="text-3xl font-serif font-bold text-secondary">
                {categories[activeCategory].title}
              </h2>
              {categories[activeCategory].subtitle && (
                <p className="text-stone-500 text-sm mt-1">
                  {categories[activeCategory].subtitle}
                </p>
              )}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories[activeCategory].items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex flex-col justify-between"
                >
                  {item.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif font-bold text-lg text-secondary">
                          {item.name}
                        </h3>
                        <span className="text-primary font-bold">{item.price}</span>
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {mode === 'restaurant' && config.cart.enabled && (
                      <button
                        onClick={() => addItem(item.id, item.name, item.price)}
                        className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all ${
                          isItemInCart(item.id)
                            ? "bg-accent/20 text-accent"
                            : "bg-stone-100 text-secondary hover:bg-primary hover:text-white"
                        }`}
                      >
                        {isItemInCart(item.id) ? (
                          <>
                            <Check size={16} />
                            In Order
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            Add to Order
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <CartProvider>
      <Navbar />
      <MenuContent />
      <Footer />
    </CartProvider>
  );
}
