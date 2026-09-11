import React from "react";
import config from "../../../business-config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsOfServicePage() {
  const { contact } = config;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h1 className="text-4xl font-serif font-bold text-secondary">
            Terms of Service
          </h1>
          <p className="text-sm text-stone-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">2. Orders & Services</h2>
            <p>
              All orders placed through our website are subject to availability and acceptance. Prices and menus are subject to change without notice.
            </p>
          </section>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">3. Limitation of Liability</h2>
            <p>
              {contact.businessName} shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use this website.
            </p>
          </section>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">4. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to:
            </p>
            <p className="font-semibold text-secondary">
              {contact.businessName}<br />
              Email: {contact.email}<br />
              Phone: {contact.phone}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
