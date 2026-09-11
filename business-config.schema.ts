/**
 * Business Site Configuration Schema
 *
 * This file defines the TypeScript types for the business configuration.
 * Each client site has a business-config.ts that follows this schema.
 */

export type BusinessType = 'restaurant' | 'barbershop' | 'gym' | 'salon' | 'cafe' | 'retail' | 'service' | 'Clan';

export type SiteVibe = 'modern' | 'rustic' | 'bold' | 'minimal' | 'elegant' | 'playful' | 'Arabian Rustic';

export interface ColorPalette {
  primary: string;      // Main brand color
  secondary: string;    // Secondary/dark color
  accent: string;       // Accent/highlight color
  background: string;   // Page background
  foreground: string;   // Text color
}

export interface Typography {
  headingFont: string;  // Google Font name for headings
  bodyFont: string;     // Google Font name for body text
}

export interface ContactInfo {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    plusCode?: string;  // Google Plus Code for map
  };
  hours: Array<{
    day: string;
    hours: string;
  }>;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    linkedin?: string;
  };
}

export interface HeroSection {
  enabled: boolean;
  title: string;        // Can include <span class="accent"> for colored text
  subtitle: string;
  backgroundImage: string;  // URL or path
  ctaButtons: Array<{
    text: string;
    href: string;
    style: 'primary' | 'secondary';
  }>;
  badge?: {
    icon?: string;      // Lucide icon name
    text: string;
  };
}

export interface AboutSection {
  enabled: boolean;
  title: string;
  description: string;
  story?: string;       // Additional paragraph
  image: string;
  ctaLink?: {
    text: string;
    href: string;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  category?: string;
}

export interface MenuCategory {
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface MenuSection {
  enabled: boolean;
  mode: 'restaurant' | 'services';  // Restaurant has cart, services is static list
  displayStyle: 'grid' | 'list';
  categories: Record<string, MenuCategory>;
  highlights?: MenuItem[];  // Featured items for homepage
}

export interface GallerySection {
  enabled: boolean;
  title: string;
  subtitle?: string;
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;  // 1-5
  avatar?: string;
}

export interface TestimonialsSection {
  enabled: boolean;
  title: string;
  subtitle?: string;
  testimonials: TestimonialItem[];
}

export interface ContactSection {
  enabled: boolean;
  title: string;
  subtitle?: string;
  showMap: boolean;
  showForm: boolean;
  formSubmitEndpoint?: string;  // URL to POST form data
}

export interface FooterSection {
  enabled: boolean;
  copyrightText: string;
  legalPages: {
    privacy: boolean;
    terms: boolean;
  };
}

export interface CartConfig {
  enabled: boolean;
  submitEndpoint: string;  // Where to POST orders
  emailRecipient?: string; // Email to receive orders (alternative to endpoint)
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;  // Social share image
}

export interface BusinessConfig {
  // Meta
  businessType: BusinessType;
  vibe: SiteVibe;

  // Branding
  logo?: string;  // Path or URL to logo
  colors: ColorPalette;
  typography: Typography;

  // Contact & Basic Info
  contact: ContactInfo;

  // Sections (toggle on/off per client)
  sections: {
    hero: HeroSection;
    about: AboutSection;
    menu: MenuSection;
    gallery: GallerySection;
    testimonials: TestimonialsSection;
    contact: ContactSection;
    footer: FooterSection;
  };

  // Features
  cart: CartConfig;

  // SEO
  seo: SEOConfig;
}
