"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import config from "../../../business-config";

function CheckoutContent() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      customer: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        notes: formData.get("notes"),
      },
      items: cart,
      total: totalPrice,
      timestamp: new Date().toISOString(),
    };

    try {
      const endpoint = config.cart.submitEndpoint || "/api/orders";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        router.push("/confirmation");
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit order. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center">
        <p>Your cart is empty. Please add items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-8">
          Complete Your Order
        </h1>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-100 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-secondary mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Special Instructions</label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Allergies, pickup preferences, extra sauce..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            <div className="pt-6 border-t border-stone-200">
              <div className="flex justify-between items-center text-lg font-bold mb-6">
                <span>Total to Pay upon pickup:</span>
                <span className="text-primary text-2xl">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-50"
              >
                {submitting ? "Placing Order..." : "Place Order (Pay on Pickup)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CartProvider>
      <Navbar />
      <CheckoutContent />
      <Footer />
    </CartProvider>
  );
}
