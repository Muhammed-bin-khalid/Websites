# Business Site Template

A config-driven Next.js website generator for quickly producing polished, custom one-page sites for local businesses — restaurants, barbershops, gyms, salons, and more. Go from business info to a deployable site in under an hour.

## Features

- **Config-Driven Architecture**: Single `business-config.ts` file controls all content, branding, and sections
- **Modular Sections**: Toggle on/off Hero, About, Menu/Services, Gallery, Testimonials, Contact, Footer
- **Built-in Theming**: 5 preset vibes (modern, rustic, bold, minimal, elegant) with customizable colors/fonts
- **Cart System**: Optional ordering system for restaurants/cafes with email notifications
- **Responsive & Fast**: Built with Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **CLI Scaffolder**: Generate new client configs in seconds with `npm run new-client`

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create a New Client Site

```bash
npm run new-client
```

Answer the prompts (business name, type, address, etc.) and the script will generate a config file pre-filled with your data.

### 3. Customize the Config

Edit the generated `business-config.[client-name].ts` file to:
- Add menu items or service offerings
- Upload/link photos (hero image, about image, menu item images)
- Adjust colors, fonts, and branding
- Enable/disable sections
- Configure contact details

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview.

### 5. Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
business-site-template/
├── business-config.schema.ts      # TypeScript schema for config
├── business-config.demo.ts        # Demo config (Tlahco Kitchen)
├── business-config.ts             # Active config (points to current client)
├── scripts/
│   └── new-client.js              # CLI to generate new client configs
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (applies colors/fonts)
│   │   ├── page.tsx               # Homepage
│   │   ├── menu/                  # Full menu page
│   │   ├── cart/                  # Shopping cart (if enabled)
│   │   ├── checkout/              # Checkout form
│   │   ├── confirmation/          # Order confirmation
│   │   ├── privacy/               # Privacy policy
│   │   ├── terms/                 # Terms of service
│   │   └── api/
│   │       ├── contact/           # Contact form endpoint
│   │       └── orders/            # Order submission endpoint
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Navigation (config-driven links)
│   │   │   └── Footer.tsx         # Footer (config-driven content)
│   │   └── sections/
│   │       ├── Hero.tsx           # Hero with CTA
│   │       ├── About.tsx          # About/Story section
│   │       ├── FeaturedMenu.tsx   # Featured items on homepage
│   │       ├── Testimonials.tsx   # Client testimonials
│   │       └── Contact.tsx        # Contact form + map
│   ├── context/
│   │   └── CartContext.tsx        # Cart state management
│   └── lib/
└── README.md
```

## Configuration Guide

### Business Types

- `restaurant` - Includes menu and cart system
- `cafe` - Like restaurant but lighter styling
- `barbershop` - Services list, appointment focus
- `gym` - Services/classes, testimonials-heavy
- `salon` - Services with pricing, booking CTA
- `service` - Generic service business

### Theme Vibes

Each vibe has preset colors and fonts:

- **modern**: Clean, minimal, blue accent
- **rustic**: Warm terracotta, serif headings (like Tlahco demo)
- **bold**: High contrast, red/orange accents
- **minimal**: Monochrome, sans-serif throughout
- **elegant**: Deep burgundy, refined serif

### Sections Configuration

Each section has an `enabled` flag. Set to `false` to hide.

#### Hero
- Title with HTML support (use `<span class="accent">` for colored text)
- Background image
- CTA buttons (primary/secondary styles)
- Optional badge with icon

#### About
- Image + text layout
- Optional CTA link
- Story field for extended copy

#### Menu/Services
- **mode**: `'restaurant'` (with cart) or `'services'` (static list)
- **highlights**: Featured items shown on homepage
- **categories**: Full menu organized by category

#### Gallery
- Grid of images with captions
- Currently optional/not heavily used

#### Testimonials
- Star ratings, name, role, quote
- 3-column grid

#### Contact
- Auto-generated map from address
- Contact form with configurable endpoint
- Business hours display

### Cart System

Only enabled for `restaurant` and `cafe` types by default.

```typescript
cart: {
  enabled: true,
  submitEndpoint: '/api/orders',
  emailRecipient: 'orders@yourbusiness.com',
}
```

Orders are logged to console. In production, integrate with an email service (SendGrid, Resend, etc.) in `src/app/api/orders/route.ts`.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (auto-detected as Next.js)

### Netlify

```bash
npm run build
```

Deploy the `.next` directory.

### Other Hosts

Any host that supports Next.js (Railway, Render, AWS Amplify, etc.).

## Customization Tips

### Changing Active Client

Edit `business-config.ts` to point to a different config:

```typescript
import { businessConfig } from './business-config.client-name';
export default businessConfig;
```

### Adding Custom Sections

1. Create component in `src/components/sections/`
2. Add to schema if needed
3. Import and render conditionally in `src/app/page.tsx`

### Email Integration

Replace console logs in API routes with actual email service:

```typescript
// In src/app/api/orders/route.ts
import { sendEmail } from '@/lib/email';

await sendEmail({
  to: config.cart.emailRecipient,
  subject: `New order from ${data.customer.name}`,
  body: generateOrderHTML(data)
});
```

### Custom Fonts

Add fonts to `typography` config (must be Google Fonts):

```typescript
typography: {
  headingFont: 'Bebas Neue',
  bodyFont: 'Roboto',
}
```

### Custom Colors

Override any color in the palette:

```typescript
colors: {
  primary: '#FF6B6B',
  secondary: '#2D3748',
  accent: '#FFC23C',
  background: '#FFFFFF',
  foreground: '#1A202C',
}
```

## Demo Site

The template includes a complete demo configuration (`business-config.demo.ts`) that recreates the **Tlahco Mexican Kitchen** site with:
- Full restaurant menu (breakfast, tacos, entrees, desserts, drinks)
- Shopping cart system
- Contact form and map
- Testimonials
- Complete branding

Run `npm run dev` after install to see it in action.

## Time to Client Site

**Target: Under 1 hour per client**

- 5 min: Run `npm run new-client`, answer prompts
- 10 min: Gather/upload client photos
- 20 min: Customize menu items / services in config
- 15 min: Tweak colors, copy, test sections
- 10 min: Final review and deploy

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## License

MIT - Use freely for client work.

---

Built with ❤️ for freelancers who need to move fast without sacrificing quality.
