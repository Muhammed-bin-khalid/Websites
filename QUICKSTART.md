# Quick Start Guide

## Get Your First Client Site Running in 10 Minutes

### 1. Install Dependencies (2 min)

```bash
cd business-site-template
npm install
```

### 2. Preview the Demo Site (1 min)

The template includes a complete demo (Tlahco Kitchen) ready to view:

```bash
npm run dev
```

Open http://localhost:3000 to see:
- Full restaurant menu with categories
- Working shopping cart
- Contact form with map
- Testimonials
- All sections in action

### 3. Create Your First Client Config (3 min)

```bash
npm run new-client
```

Answer the prompts:
- Business Name: **Joe's Barbershop**
- Business Type: **barbershop**
- Theme Vibe: **bold**
- Tagline: **Classic Cuts, Modern Style**
- Phone: **+1 512 555 1234**
- Email: **joe@joesbarbershop.com**
- Address: **456 Main St, Austin, TX 78701**

This generates `business-config.joes-barbershop.ts` and switches it to active.

### 4. Customize the Menu/Services (4 min)

Open the generated config file and replace the placeholder services:

```typescript
categories: {
  main: {
    title: 'Haircuts & Styling',
    subtitle: 'Professional grooming services',
    items: [
      {
        id: 'cut-1',
        name: 'Classic Haircut',
        description: 'Traditional scissor cut with attention to detail',
        price: '$35.00',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 'cut-2',
        name: 'Fade + Beard Trim',
        description: 'Modern fade with precision beard shaping',
        price: '$45.00',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 'cut-3',
        name: 'Hot Towel Shave',
        description: 'Relaxing straight razor shave with hot towels',
        price: '$40.00',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
}
```

Refresh browser - changes appear instantly!

---

## That's It!

Your client site is now:
- ✅ Fully branded with their colors
- ✅ Showing their services
- ✅ Contact form connected
- ✅ Mobile responsive
- ✅ Ready to deploy

## Next Steps

### To Deploy to Vercel:

1. Push to GitHub
2. Import in Vercel
3. Deploy (takes 2 minutes)

### To Customize Further:

**Change Colors:**
```typescript
colors: {
  primary: '#DC2626',    // Your brand color
  secondary: '#111827',
  accent: '#F59E0B',
}
```

**Change Hero Image:**
```typescript
hero: {
  backgroundImage: 'https://your-image-url.com/hero.jpg',
}
```

**Add More Testimonials:**
```typescript
testimonials: [
  {
    id: 't1',
    name: 'Mike Johnson',
    role: 'Regular Client',
    text: 'Best haircut I\'ve ever had!',
    rating: 5,
  },
  // Add more...
]
```

**Toggle Sections On/Off:**
```typescript
sections: {
  hero: { enabled: true },
  about: { enabled: true },
  menu: { enabled: true },
  gallery: { enabled: false },  // Hide gallery
  testimonials: { enabled: true },
  contact: { enabled: true },
}
```

---

## Common Business Types

### Restaurant/Cafe
- Set `businessType: 'restaurant'`
- Set `cart.enabled: true`
- Set `menu.mode: 'restaurant'`
- Add full menu categories

### Service Business (Barbershop, Salon, Gym)
- Set `businessType: 'barbershop'` (or salon/gym)
- Set `cart.enabled: false`
- Set `menu.mode: 'services'`
- Add service items with pricing
- Contact CTA goes to booking

---

## Need Help?

See `README.md` for complete documentation including:
- Full config schema reference
- API endpoint customization
- Email integration
- Advanced theming
- Deployment guides
