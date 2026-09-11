import type { Metadata } from 'next';
import config from '../../business-config';
import './globals.css';

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    images: config.seo.ogImage ? [{ url: config.seo.ogImage }] : [],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colors, typography } = config;

  return (
    <html lang="en" style={{
      ['--config-primary' as any]: colors.primary,
      ['--config-secondary' as any]: colors.secondary,
      ['--config-accent' as any]: colors.accent,
      ['--config-background' as any]: colors.background,
      ['--config-foreground' as any]: colors.foreground,
      ['--font-heading' as any]: typography.headingFont,
      ['--font-body' as any]: typography.bodyFont,
    }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href={`https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
