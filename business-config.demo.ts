import { BusinessConfig } from './business-config.schema';

/**
 * Demo Configuration - Tlahco Mexican Kitchen
 *
 * This config recreates the Tlahco site to demonstrate the template system.
 * Use this as a reference when creating new client configs.
 */

export const businessConfig: BusinessConfig = {
  // Meta
  businessType: 'restaurant',
  vibe: 'rustic',

  // Branding
  colors: {
    primary: '#B45309',      // Terracotta
    secondary: '#451A03',    // Espresso
    accent: '#D97706',       // Golden Maize
    background: '#FAFAF9',   // Stone
    foreground: '#1C1917',   // Dark text
  },

  typography: {
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
  },

  // Contact Info
  contact: {
    businessName: 'Tlahco Kitchen',
    tagline: 'Authentic Mexican Cuisine',
    phone: '+1 210 239 9457',
    email: 'info@tlahcokitchen.com',
    address: {
      street: '6702 San Pedro Ave',
      city: 'San Antonio',
      state: 'TX',
      zip: '78216',
      plusCode: 'GG22+6F',
    },
    hours: [
      { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Thursday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Friday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Saturday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Sunday', hours: '11:00 AM - 10:00 PM' },
    ],
    social: {
      facebook: 'https://facebook.com/tlahcokitchen',
      instagram: 'https://instagram.com/tlahcokitchen',
    },
  },

  // Sections
  sections: {
    hero: {
      enabled: true,
      title: 'The Heart of <span class="accent">Mexico</span><br/>in San Antonio',
      subtitle: 'Experience a symphony of flavors crafted from ancestral recipes and the finest ingredients. Not your average Mexican restaurant.',
      backgroundImage: 'https://images.unsplash.com/photo-1504674900247-a198b7a6da96?q=80&w=2070&auto=format&fit=crop',
      ctaButtons: [
        { text: 'Order Online', href: '/menu', style: 'primary' },
        { text: 'Explore Menu', href: '#menu', style: 'secondary' },
      ],
      badge: {
        icon: 'Utensils',
        text: 'Authentic Mexican Cuisine',
      },
    },

    about: {
      enabled: true,
      title: 'Not Your Average Mexican Restaurant',
      description: 'At Tlahco Kitchen, we believe in the power of tradition. Our recipes have been passed down through generations, bringing the authentic flavors of the heart of Mexico to the vibrant city of San Antonio.',
      story: 'Every dish we serve is a tribute to the rich culinary heritage of Mexico. From the carefully selected spices to the slow-cooking methods, we prioritize authenticity and quality above all else. Our kitchen is a place where passion meets tradition, and every plate tells a story of heritage, family, and flavor.',
      image: 'https://images.unsplash.com/photo-1756156250833-b625fffd724c?auto=format&fit=crop&q=80&w=800',
      ctaLink: {
        text: 'Learn More About Our Heritage',
        href: '/story',
      },
    },

    menu: {
      enabled: true,
      mode: 'restaurant',
      displayStyle: 'grid',
      highlights: [
        {
          id: 'm1',
          name: 'Tlahco Special Tacos',
          description: 'Hand-made corn tortillas filled with slow-roasted pork, topped with fresh cilantro, onion, and our secret salsa.',
          price: '$14.00',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
          category: 'Signature',
        },
        {
          id: 'm2',
          name: 'Mole Poblano Chicken',
          description: 'Tender chicken breast simmered in a rich, complex sauce of chili, chocolate, and seeds. A true Mexican classic.',
          price: '$18.00',
          image: 'https://images.unsplash.com/photo-1675718343369-b2e46a5ceeca?auto=format&fit=crop&q=80&w=800',
          category: 'Authentic',
        },
        {
          id: 'm3',
          name: 'Enchiladas Suizas',
          description: 'Corn tortillas stuffed with shredded chicken, covered in a creamy green tomatillo sauce and melted cheese.',
          price: '$16.00',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
          category: 'Favorites',
        },
        {
          id: 'm4',
          name: 'Sizzling Fajitas',
          description: 'Marinated steak or shrimp grilled with bell peppers and onions, served with guacamole and sour cream.',
          price: '$22.00',
          image: 'https://images.unsplash.com/photo-1756521973435-4e4e1d2884b7?auto=format&fit=crop&q=80&w=800',
          category: 'Classic',
        },
      ],
      categories: {
        breakfast: {
          title: 'Desayunos',
          subtitle: 'Start your morning with the authentic taste of Mexico',
          items: [
            { id: 'br1', name: 'Fruta', description: 'Yogurt, granola and honey', price: '$12.00', image: 'https://images.unsplash.com/photo-1533089860892-a75557756ed7?auto=format&fit=crop&q=80&w=800' },
            { id: 'br2', name: 'Panqueques', description: 'Buttermilk pancakes with maple syrup and butter', price: '$12.00', image: 'https://images.unsplash.com/photo-1751904628132-7e2ba0e9f28f?auto=format&fit=crop&q=80&w=800' },
            { id: 'br8', name: 'Huevos Benitos', description: 'Two poached eggs, beans, chorizo topped with poblano sauce and queso fresco on sopecitos', price: '$14.00', image: 'https://images.unsplash.com/photo-1525351484163-7529abc64614?auto=format&fit=crop&q=80&w=800' },
          ],
        },
        appetizers: {
          title: 'Antojitos',
          subtitle: 'Perfect starters to ignite your appetite',
          items: [
            { id: 'a1', name: 'Guacamole Tradicional', description: 'Made to order topped with Pico de Gallo and served with tortilla chips', price: '$12.00', image: 'https://images.unsplash.com/photo-1648437595587-e6a8b0cdf1f9?auto=format&fit=crop&q=80&w=800' },
            { id: 'a2', name: 'Bean Dip', description: 'Chorizo and bean dip, first one is on the house after 11 am', price: '$6.00', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800' },
            { id: 'a3', name: 'Queso Fundido', description: 'Melted cheese topped with chorizo or rajas. Served with tortillas', price: '$14.00', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800' },
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
      title: 'What Our Guests Say',
      subtitle: 'Join thousands of happy customers who have discovered the true taste of Mexico.',
      testimonials: [
        {
          id: 't1',
          name: 'Sarah M.',
          role: 'Local Foodie',
          text: 'The most authentic tacos I\'ve had outside of Mexico! The Mole is a masterpiece.',
          rating: 5,
        },
        {
          id: 't2',
          name: 'David R.',
          role: 'Regular Customer',
          text: 'Amazing service and even better food. Tlahco has become our Friday night tradition.',
          rating: 5,
        },
        {
          id: 't3',
          name: 'Elena G.',
          role: 'Catering Client',
          text: 'We used Tlahco for our company event and everyone was blown away. Highly recommended!',
          rating: 4,
        },
      ],
    },

    contact: {
      enabled: true,
      title: 'Visit Tlahco Kitchen',
      subtitle: 'We\'d love to hear from you. Whether it\'s a reservation, a catering inquiry, or just a hello.',
      showMap: true,
      showForm: true,
      formSubmitEndpoint: '/api/contact',
    },

    footer: {
      enabled: true,
      copyrightText: '© 2026 Tlahco Kitchen. All rights reserved.',
      legalPages: {
        privacy: true,
        terms: true,
      },
    },
  },

  // Cart
  cart: {
    enabled: true,
    submitEndpoint: '/api/orders',
    emailRecipient: 'orders@tlahcokitchen.com',
  },

  // SEO
  seo: {
    title: 'Tlahco Kitchen | Authentic Mexican Cuisine in San Antonio',
    description: 'Experience authentic Mexican flavors in San Antonio. Hand-crafted dishes from ancestral recipes. Order online or visit us today.',
    keywords: ['mexican restaurant', 'san antonio', 'authentic tacos', 'mexican food', 'tlahco'],
    ogImage: 'https://images.unsplash.com/photo-1504674900247-a198b7a6da96?q=80&w=1200',
  },
};
