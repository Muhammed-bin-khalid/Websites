"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import config from "../../../business-config";

export default function About() {
  if (!config.sections.about.enabled) return null;

  const { about } = config.sections;

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={about.image}
                alt={config.contact.businessName}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full -z-10 blur-3xl" />
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-accent/10 rounded-full -z-10 blur-3xl" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-primary font-semibold uppercase tracking-widest text-sm">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-secondary">
                {about.title}
              </h2>
            </div>
            <p className="text-lg text-stone-600 leading-relaxed">
              {about.description}
            </p>
            {about.story && (
              <p className="text-stone-600 leading-relaxed">
                {about.story}
              </p>
            )}
            {about.ctaLink && (
              <div className="pt-4">
                <Link
                  href={about.ctaLink.href}
                  className="group flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors"
                >
                  {about.ctaLink.text}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
