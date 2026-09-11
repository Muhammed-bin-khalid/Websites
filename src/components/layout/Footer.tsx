"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import config from "../../../business-config";

export default function Footer() {
  if (!config.sections.footer.enabled) return null;

  const { contact, sections } = config;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <footer className="bg-primary text-white py-16 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
        >
          {/* Business Info */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="inline-block group">
              <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-white/80 transition-colors">
                {contact.businessName}
              </h3>
            </Link>
            <p className="text-white/50 text-sm font-mono mb-2">{contact.tagline}</p>
            <p className="text-white/50 text-sm">
              {contact.address.city}, {contact.address.state}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:text-right">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-6">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "Capabilities", href: "/#capabilities" },
                { name: "Process", href: "/#process" },
                { name: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 relative group inline-block"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 right-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 origin-right" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[10px] font-mono text-white/30 tracking-wider">
            {sections.footer.copyrightText}
          </p>
          
          {contact.social && (
            <div className="flex gap-8">
              {contact.social.linkedin && (
                <a 
                  href={contact.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors duration-300 relative group"
                >
                  LinkedIn
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </a>
              )}
              {contact.social.twitter && (
                <a 
                  href={contact.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors duration-300 relative group"
                >
                  Twitter
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
