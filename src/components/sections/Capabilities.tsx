"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Server, Globe, Scissors, Workflow } from "lucide-react";

const capabilities = [
  {
    id: "ai",
    title: "AI & Automation",
    icon: Bot,
    background: "bg-primary",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
    skills: [
      {
        name: "AI Voice Agents",
        description: "Deploy intelligent voice systems that handle customer inquiries, schedule appointments, and automate support 24/7.",
      },
      {
        name: "AI Agent Setup",
        description: "Configure and deploy custom AI agents that integrate with your existing tools and workflows.",
      },
      {
        name: "Claude Code Setup",
        description: "Set up Claude-powered coding assistants for your development team to accelerate development cycles.",
      },
      {
        name: "Open Claw Setup",
        description: "Implement Open Claw for advanced AI orchestration and multi-agent system management.",
      },
    ],
  },
  {
    id: "n8n",
    title: "N8N & Workflows",
    icon: Workflow,
    background: "bg-background",
    textColor: "text-primary",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
    skills: [
      {
        name: "N8N AI Agent Setup",
        description: "Build and deploy autonomous AI agents using N8N that connect to your tools, databases, and APIs.",
      },
      {
        name: "Automated Workflows",
        description: "Design end-to-end automation pipelines that eliminate manual tasks and scale your operations.",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: Server,
    background: "bg-primary",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
    skills: [
      {
        name: "API Keys & Integrations",
        description: "Securely manage API credentials and build robust integrations between your business systems.",
      },
      {
        name: "Web Hosting",
        description: "Deploy and configure reliable, scalable hosting solutions optimized for your specific needs.",
      },
    ],
  },
  {
    id: "web",
    title: "Web & Commerce",
    icon: Globe,
    background: "bg-background",
    textColor: "text-primary",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
    skills: [
      {
        name: "Website Design",
        description: "Create modern, responsive websites that convert visitors into customers and reflect your brand.",
      },
      {
        name: "Web Payment Processing",
        description: "Integrate secure payment gateways that handle transactions smoothly and protect customer data.",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Clipping",
    icon: Scissors,
    background: "bg-primary",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop",
    skills: [
      {
        name: "Opus Clip Setup",
        description: "Configure Opus Clip to automatically repurpose long-form content into viral short-form clips for social media.",
      },
      {
        name: "Content Clipping Strategy",
        description: "Develop a systematic approach to clipping and distributing content across TikTok, Reels, and Shorts.",
      },
    ],
  },
];

function CapabilitySection({ capability, index }: { capability: typeof capabilities[0]; index: number }) {
  const Icon = capability.icon;
  const isEven = index % 2 === 0;
  const isLight = !capability.textColor.includes("white");

  return (
    <div className={`${capability.background} ${capability.textColor}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`relative h-72 md:h-96 lg:h-auto overflow-hidden ${isEven ? '' : 'lg:order-2'}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('${capability.image}')`,
              filter: 'grayscale(100%) contrast(1.2)',
            }}
          />
          <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-r from-background/30 to-transparent' : 'bg-gradient-to-r from-primary/30 to-transparent'}`} />
        </motion.div>

        {/* Content */}
        <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${isEven ? '' : 'lg:order-1'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 border ${isLight ? 'border-primary/20' : 'border-white/20'} rounded-full flex items-center justify-center`}>
              <Icon size={20} />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-50">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-10 ${capability.textColor}`}>
            {capability.title}
          </h3>

          <div className="space-y-8">
            {capability.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="group">
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-px ${isLight ? 'bg-primary' : 'bg-white'} mt-3 opacity-30`} />
                  <div>
                    <h4 className={`text-lg font-heading font-semibold mb-2 ${capability.textColor}`}>
                      {skill.name}
                    </h4>
                    <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-500' : 'text-white/60'}`}>
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-400 mb-6 block">
            What I Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary">
            Capabilities
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-8" />
        </div>

        {/* Capability Bands */}
        <div className="space-y-0">
          {capabilities.map((capability, index) => (
            <CapabilitySection key={capability.id} capability={capability} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
