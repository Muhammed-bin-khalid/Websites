#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Preset vibes & colors
const VIBE_PRESETS = {
  modern: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    primary: '#0F172A',
    secondary: '#1E293B',
    accent: '#3B82F6',
    background: '#FFFFFF',
    foreground: '#0F172A'
  },
  rustic: {
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    primary: '#B45309',
    secondary: '#451A03',
    accent: '#D97706',
    background: '#FAFAF9',
    foreground: '#1C1917'
  },
  bold: {
    headingFont: 'Montserrat',
    bodyFont: 'Open Sans',
    primary: '#DC2626',
    secondary: '#111827',
    accent: '#F59E0B',
    background: '#F9FAFB',
    foreground: '#111827'
  },
  minimal: {
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Plus Jakarta Sans',
    primary: '#18181B',
    secondary: '#27272A',
    accent: '#71717A',
    background: '#FAFAFA',
    foreground: '#18181B'
  },
  elegant: {
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Montserrat',
    primary: '#831843',
    secondary: '#500724',
    accent: '#BE185D',
    background: '#FFF1F2',
    foreground: '#4C0519'
  }
};

async function main() {
  console.log('\n=============================================');
  console.log('✨ Business Site Template - Client Scaffolder');
  console.log('=============================================\n');

  const businessName = (await question('Business Name (e.g. Acme Barbershop): ')) || 'Acme Business';
  const businessType = (await question('Business Type [restaurant/barbershop/gym/salon/cafe/service] (restaurant): ')) || 'restaurant';
  const vibe = (await question('Theme Vibe [modern/rustic/bold/minimal/elegant] (rustic): ')) || 'rustic';
  const tagline = (await question('Tagline (e.g. Premium Grooming in Austin): ')) || 'Quality Service You Can Trust';
  const phone = (await question('Phone Number (+1 555 123 4567): ')) || '+1 555 123 4567';
  const email = (await question('Email Address (info@example.com): ')) || 'info@example.com';
  const street = (await question('Street Address (123 Main St): ')) || '123 Main St';
  const city = (await question('City (San Antonio): ')) || 'San Antonio';
  const state = (await question('State (TX): ')) || 'TX';
  const zip = (await question('Zip Code (78216): ')) || '78216';

  const preset = VIBE_PRESETS[vibe] || VIBE_PRESETS.rustic;
  const isFood = businessType === 'restaurant' || businessType === 'cafe';

  const clientSlug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const configFileName = `business-config.${clientSlug}.ts`;
  const configPath = path.join(__dirname, '..', configFileName);

  const configContent = `import { BusinessConfig } from './business-config.schema';

export const businessConfig: BusinessConfig = {
  businessType: '${businessType}',
  vibe: '${vibe}',

  colors: {
    primary: '${preset.primary}',
    secondary: '${preset.secondary}',
    accent: '${preset.accent}',
    background: '${preset.background}',
    foreground: '${preset.foreground}',
  },

  typography: {
    headingFont: '${preset.headingFont}',
    bodyFont: '${preset.bodyFont}',
  },

  contact: {
    businessName: '${businessName}',
    tagline: '${tagline}',
    phone: '${phone}',
    email: '${email}',
    address: {
      street: '${street}',
      city: '${city}',
      state: '${state}',
      zip: '${zip}',
    },
    hours: [
      { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    social: {
      instagram: 'https://instagram.com/${clientSlug}',
    },
  },

  sections: {
    hero: {
      enabled: true,
      title: '${businessName}',
      subtitle: '${tagline}',
      backgroundImage: 'https://images.unsplash.com/photo-1504674900247-a198b7a6da96?q=80&w=2070&auto=format&fit=crop',
      ctaButtons: [
        { text: '${isFood ? 'Order Online' : 'Book Appointment'}', href: '${isFood ? '/menu' : '#contact'}', style: 'primary' },
        { text: '${isFood ? 'Explore Menu' : 'View Services'}', href: '#menu', style: 'secondary' },
      ],
      badge: {
        text: '${tagline}',
      },
    },

    about: {
      enabled: true,
      title: 'About ${businessName}',
      description: 'We are dedicated to providing the best quality service for our community.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    },

    menu: {
      enabled: true,
      mode: '${isFood ? 'restaurant' : 'services'}',
      displayStyle: 'grid',
      highlights: [
        {
          id: 'item-1',
          name: '${isFood ? 'House Specialty' : 'Signature Service'}',
          description: 'Our most popular offering crafted to perfection.',
          price: '$25.00',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
        },
      ],
      categories: {
        main: {
          title: '${isFood ? 'Main Menu' : 'Popular Services'}',
          subtitle: 'Choose from our curated options',
          items: [
            {
              id: 'item-1',
              name: '${isFood ? 'House Specialty' : 'Signature Service'}',
              description: 'Our most popular offering crafted to perfection.',
              price: '$25.00',
              image: 'https://images.unsplash.com/photo-1504674900247-a198b7a6da96?auto=format&fit=crop&q=80&w=800',
            },
          ],
        },
      },
    },

    gallery: {
      enabled: false,
      title: 'Gallery',
      images: [],
    },

    testimonials: {
      enabled: true,
      title: 'What Our Clients Say',
      subtitle: 'Read reviews from our satisfied clients.',
      testimonials: [
        {
          id: 't1',
          name: 'Alex Johnson',
          role: 'Client',
          text: 'Absolutely wonderful experience from start to finish. Highly recommended!',
          rating: 5,
        },
      ],
    },

    contact: {
      enabled: true,
      title: 'Contact Us',
      subtitle: 'Get in touch or stop by our location.',
      showMap: true,
      showForm: true,
      formSubmitEndpoint: '/api/contact',
    },

    footer: {
      enabled: true,
      copyrightText: '© ${new Date().getFullYear()} ${businessName}. All rights reserved.',
      legalPages: {
        privacy: true,
        terms: true,
      },
    },
  },

  cart: {
    enabled: ${isFood},
    submitEndpoint: '/api/orders',
    emailRecipient: '${email}',
  },

  seo: {
    title: '${businessName} | ${tagline}',
    description: 'Welcome to ${businessName} in ${city}, ${state}. ${tagline}.',
    keywords: ['${businessName.toLowerCase()}', '${city.toLowerCase()}', '${businessType}'],
  },
};
`;

  fs.writeFileSync(configPath, configContent);

  // Update business-config.ts to point to this new config
  const activeConfigContent = `import { businessConfig } from './${configFileName.replace('.ts', '')}';
export default businessConfig;
`;
  fs.writeFileSync(path.join(__dirname, '..', 'business-config.ts'), activeConfigContent);

  console.log(`\n✅ Generated client config: ${configFileName}`);
  console.log(`✅ Set active configuration in business-config.ts`);
  console.log('\n🚀 Next Steps:');
  console.log('1. Edit ' + configFileName + ' to customize menu items, text & photos.');
  console.log('2. Run "npm run dev" to preview the site.');
  console.log('3. Run "npm run build" to create production build.\n');

  rl.close();
}

main().catch(console.error);
