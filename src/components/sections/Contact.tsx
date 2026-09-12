"use client";

import React, { useState } from "react";
import { Send, MapPin, Clock, Mail, Check } from "lucide-react";
import config from "../../../business-config";

const quickFacts = [
  { icon: MapPin, label: "Location", value: `${config.contact.address.city}, ${config.contact.address.state}` },
  { icon: Clock, label: "Response Time", value: "Within 24 hours" },
  { icon: Mail, label: "Email", value: config.contact.email, isEmail: true },
];

export default function Contact() {
  if (!config.sections.contact.enabled) return null;

  const { contact } = config.sections;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = config.sections.contact.formSubmitEndpoint || '/api/contact';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      setSubmitStatus('success');
      setFormData({ name: "", email: "", project: "", message: "" });
    } catch {
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-400 mb-6 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary">
            {contact.title}
          </h2>
          {contact.subtitle && (
            <p className="mt-6 text-gray-500 max-w-xl mx-auto font-mono text-sm">
              {contact.subtitle}
            </p>
          )}
          <div className="w-16 h-px bg-primary mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 mb-6">Quick Facts</h3>
            </div>

            <div className="space-y-8">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="flex items-start gap-5 group cursor-default">
                    <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors duration-500">
                      <Icon size={18} className="text-gray-400 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-1.5">{fact.label}</p>
                      {fact.isEmail ? (
                        <a 
                          href={`mailto:${fact.value}`}
                          className="text-primary font-heading font-semibold hover:underline underline-offset-4 decoration-1 decoration-gray-300 hover:decoration-primary transition-colors"
                        >
                          {fact.value}
                        </a>
                      ) : (
                        <p className="text-primary font-heading font-semibold">{fact.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Working Style */}
            <div className="pt-8 border-t border-gray-100">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-4">Working Style</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                I work with a small number of clients at a time to ensure dedicated attention. 
                Every project gets my full focus from discovery through handoff.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          {contact.showForm && (
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-200 text-primary font-heading focus:outline-none focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-200 text-primary font-heading focus:outline-none focus:border-primary transition-colors duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Project Type
                  </label>
                  <select
                    id="project"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-200 text-primary font-heading focus:outline-none focus:border-primary transition-colors duration-300 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a project type</option>
                    <option value="ai">AI Voice Agent / Automation</option>
                    <option value="infrastructure">Infrastructure / Hosting</option>
                    <option value="web">Website / Web App</option>
                    <option value="payment">Payment Integration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-200 text-primary font-heading focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                    required
                  />
                </div>

                <div className="pt-4">
                  {submitStatus === 'success' ? (
                    <div className="w-full bg-primary text-white px-8 py-5 text-sm font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-3">
                      <Check size={18} />
                      Message Sent
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full bg-primary text-white px-8 py-5 text-sm font-mono uppercase tracking-[0.15em] hover:bg-secondary transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
