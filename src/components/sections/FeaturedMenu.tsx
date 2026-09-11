"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import config from "../../../business-config";

export default function FeaturedMenu() {
  if (!config.sections.menu.enabled || !config.sections.menu.highlights) return null;

  const { highlights, mode } = config.sections.menu;
  const { addItem, cart } = useCart();

  const isItemInCart = (id: string) => cart.some((item) => item.id === id);

  return (
    <section id="menu" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">
              {mode === 'restaurant' ? 'Culinary Highlights' : 'Our Services'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary">
              {mode === 'restaurant' ? 'Featured Specialties' : 'Popular Offerings'}
            </h2>
          </div>
          <Link
            href="/menu"
            className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
          >
            {mode === 'restaurant' ? 'View Full Menu' : 'View All Services'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              {item.image && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.category && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-secondary">
                      {item.category}
                    </span>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif font-bold text-xl text-secondary group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                  </div>
                  <p className="text-stone-500 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Add to Cart / Action Button */}
                {mode === 'restaurant' && config.cart.enabled ? (
                  <button
                    onClick={() => addItem(item.id, item.name, item.price)}
                    className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isItemInCart(item.id)
                        ? "bg-accent/20 text-accent"
                        : "bg-stone-50 text-secondary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {isItemInCart(item.id) ? (
                      <>
                        <Check size={18} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Add to Order
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href="/#contact"
                    className="w-full py-3 rounded-2xl font-bold text-center bg-stone-50 text-secondary hover:bg-primary hover:text-white transition-all"
                  >
                    Inquire
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
