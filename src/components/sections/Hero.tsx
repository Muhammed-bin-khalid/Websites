"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import config from "../../../business-config";

export default function Hero() {
  if (!config.sections.hero.enabled) return null;

  const { hero } = config.sections;

  const letterVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.03,
        duration: 0.8,
        ease: "easeOut" as const,
      },
    }),
  };

  const headingWords = hero.title.replace(/<br\/>/g, ' ').replace(/<span class="accent">/g, '').replace(/<\/span>/g, '').split(' ');

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${hero.backgroundImage}')`,
            filter: 'grayscale(100%) contrast(1.2)',
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute inset-0 bg-primary"
        />
      </motion.div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        {/* Badge */}
        {hero.badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-10"
          >
            <span className="flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-[11px] font-mono uppercase tracking-[0.2em]">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
              {hero.badge.text}
            </span>
          </motion.div>
        )}

        {/* Heading with staggered word animation */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-10 leading-[1.05]"
        >
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="text-base md:text-lg text-white/60 mb-14 max-w-2xl mx-auto leading-relaxed font-mono font-light"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {hero.ctaButtons.map((btn, index) => (
            <a
              key={index}
              href={btn.href}
              onClick={(e) => scrollToSection(e, btn.href)}
              className={
                btn.style === 'primary'
                  ? "group relative overflow-hidden bg-white text-primary px-10 py-5 text-sm font-mono uppercase tracking-[0.15em] hover:bg-white/90 transition-colors duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
                  : "relative bg-transparent text-white border border-white/20 px-10 py-5 text-sm font-mono uppercase tracking-[0.15em] hover:border-white/40 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center"
              }
            >
              {btn.text}
              {btn.style === 'primary' && (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>

      {/* Side Decorative Lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
        className="absolute left-8 top-1/4 w-px h-24 bg-white/20 origin-top hidden lg:block"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
        className="absolute right-8 bottom-1/4 w-px h-24 bg-white/20 origin-bottom hidden lg:block"
      />
    </section>
  );
}
