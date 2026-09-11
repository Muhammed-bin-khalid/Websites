"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart, CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function CartContent() {
  const { cart, updateQuantity, removeItem, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-6">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-secondary mb-2">
          Your Order is Empty
        </h2>
        <p className="text-stone-500 max-w-sm mb-8">
          Looks like you haven't added anything to your order yet.
        </p>
        <Link
          href="/menu"
          className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-all shadow-lg hover:shadow-primary/20"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-8">
          Review Your Order
        </h1>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-100 mb-8 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b border-stone-100 last:border-0"
            >
              <div>
                <h3 className="font-bold text-secondary text-lg">{item.name}</h3>
                <p className="text-primary font-bold">{item.price}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-full px-3 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-stone-400 hover:text-secondary p-1"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-sm px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-stone-400 hover:text-secondary p-1"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-stone-400 hover:text-red-500 p-2 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-6 border-t border-stone-200 flex justify-between items-center text-xl font-bold">
            <span className="text-secondary">Subtotal:</span>
            <span className="text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/menu"
            className="px-6 py-3 rounded-full font-bold text-stone-600 hover:text-secondary transition-colors"
          >
            Add More Items
          </Link>
          <Link
            href="/checkout"
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/20"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <Navbar />
      <CartContent />
      <Footer />
    </CartProvider>
  );
}
