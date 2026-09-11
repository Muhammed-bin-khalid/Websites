import React from "react";
import config from "../../../business-config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  const { contact } = config;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h1 className="text-4xl font-serif font-bold text-secondary">
            Privacy Policy
          </h1>
          <p className="text-sm text-stone-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">1. Introduction</h2>
            <p>
              Welcome to {contact.businessName}. We respect your privacy and are committed to protecting your personal data.
              This privacy policy explains how we look after your personal data when you visit our website.
            </p>
          </section>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">2. Information We Collect</h2>
            <p>
              When you use our website, place an order, or submit a contact form, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact details such as name, email address, and phone number.</li>
              <li>Order details and preferences for food or service orders.</li>
              <li>Technical data such as IP address, browser type, and device information.</li>
            </ul>
          </section>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">3. How We Use Your Information</h2>
            <p>
              We use your information solely to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fulfill and manage your orders and inquiries.</li>
              <li>Communicate with you regarding your requests.</li>
              <li>Improve our website and customer experience.</li>
            </ul>
          </section>

          <section className="space-y-4 text-stone-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-secondary">4. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <p className="font-semibold text-secondary">
              {contact.businessName}<br />
              Email: {contact.email}<br />
              Phone: {contact.phone}<br />
              Address: {contact.address.street}, {contact.address.city}, {contact.address.state} {contact.address.zip}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
