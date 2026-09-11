"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Capabilities />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
