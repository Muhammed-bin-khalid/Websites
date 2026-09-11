"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import config from "../../../business-config";

export default function ConfirmationPage() {
  return (
    <CartProvider>
      <Navbar />
      <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-2xl text-center space-y-8">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto">
            <CheckCircle size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-secondary">
              Order Confirmed!
            </h1>
            <p className="text-lg text-stone-600">
              Thank you for your order. We've received it and will start preparing your items right away.
            </p>
            <p className="text-stone-500">
              You'll receive a confirmation email at the address you provided with pickup details and timing.
            </p>
          </div>

          <div className="bg-stone-100 rounded-2xl p-6 text-left space-y-2">
            <h3 className="font-bold text-secondary">What's Next?</h3>
            <ul className="text-sm text-stone-600 space-y-1">
              <li>• Check your email for order confirmation</li>
              <li>• We'll notify you when your order is ready</li>
              <li>• Pick up at: {config.contact.address.street}, {config.contact.address.city}</li>
              <li>• Pay upon pickup (cash or card accepted)</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/"
              className="px-8 py-3 rounded-full font-bold text-stone-600 hover:text-secondary transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-all shadow-lg"
            >
              Order Again
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </CartProvider>
  );
}
