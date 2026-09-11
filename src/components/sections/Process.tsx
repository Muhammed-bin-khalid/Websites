"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Code2, ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We start with a focused conversation to understand your business goals, technical requirements, and project scope.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Build",
    description: "I design and develop your solution with clean, maintainable code and thorough testing at every stage.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Handoff",
    description: "Complete documentation, training, and ongoing support to ensure your team can manage and scale the solution.",
    icon: ArrowUpRight,
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-6 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold">
            Process
          </h2>
          <div className="w-16 h-px bg-white/40 mx-auto mt-8" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative group text-center md:text-left">
                {/* Step Number */}
                <div className="mb-8 relative">
                  <span className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold text-white/[0.04] absolute -top-8 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 select-none">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 border border-white/15 rounded-full flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:border-white/30 transition-colors duration-500">
                  <Icon size={20} className="text-white/70 group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm max-w-xs mx-auto md:mx-0">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div className="w-8 h-px bg-white/30 mt-8 mx-auto md:mx-0" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
