import { BusinessConfig } from './business-config.schema';

export const businessConfig: BusinessConfig = {
  businessType: 'service',
  vibe: 'minimal',

  colors: {
    primary: '#0A0A0A',
    secondary: '#1A1A1A',
    accent: '#333333',
    background: '#F7F7F4',
    foreground: '#0A0A0A',
  },

  typography: {
    headingFont: 'Space Grotesk',
    bodyFont: 'JetBrains Mono',
  },

  contact: {
    businessName: 'Muhammed Khaled',
    tagline: 'Technical Consultant — AI Systems & Web Infrastructure',
    phone: '',
    email: 'muhammedbinkhaled@icloud.com',
    address: {
      street: '',
      city: 'Riyadh',
      state: 'Saudi Arabia',
      zip: '',
    },
    hours: [
      { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: 'By appointment' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    social: {
      twitter: 'https://twitter.com/muhammedkhaled',
      linkedin: 'https://www.linkedin.com/in/muhammed-bin-khaled-9a6490436/',
    },
  },

  sections: {
    hero: {
      enabled: true,
      title: 'Building AI Systems <br/><span class="accent">& Web Infrastructure</span>',
      subtitle: 'Technical consultant based in Riyadh, Saudi Arabia. I help businesses deploy AI voice agents, automate workflows, and build scalable web platforms.',
      backgroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
      ctaButtons: [
        { text: 'Start a Project', href: '#contact', style: 'primary' },
        { text: 'See Capabilities', href: '#capabilities', style: 'secondary' },
      ],
      badge: {
        text: 'Available for projects',
      },
    },

    about: {
      enabled: false,
      title: '',
      description: '',
      image: '',
    },

    menu: {
      enabled: false,
      mode: 'services',
      displayStyle: 'grid',
      categories: {},
    },

    gallery: {
      enabled: false,
      title: '',
      images: [],
    },

    testimonials: {
      enabled: false,
      title: '',
      testimonials: [],
    },

    projects: {
      enabled: true,
      title: 'Projects Completed',
      subtitle: 'A selection of projects I\'ve delivered for clients.',
    },

    contact: {
      enabled: true,
      title: 'Let\'s Build Something',
      subtitle: 'Have a project in mind? I\'d love to hear about it.',
      showMap: false,
      showForm: true,
      formSubmitEndpoint: '/api/contact',
    },

    footer: {
      enabled: true,
      copyrightText: '© 2026 Muhammed Khaled. All rights reserved.',
      legalPages: {
        privacy: false,
        terms: false,
      },
    },
  },

  cart: {
    enabled: false,
    submitEndpoint: '',
  },

  seo: {
    title: 'Muhammed Khaled — Technical Consultant | AI Systems & Web Infrastructure',
    description: 'Freelance technical consultant in Riyadh, Saudi Arabia. Building AI voice agents, web infrastructure, and automation systems for businesses.',
    keywords: ['technical consultant', 'AI systems', 'web infrastructure', 'Riyadh', 'Saudi Arabia', 'freelance'],
  },
};
