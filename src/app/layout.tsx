
import * as React from "react"
import type { Metadata } from 'next';
import { Manrope } from "next/font/google";
import './globals.css';
import { ClientProviders } from '@/app/client-providers';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Smart Refill | AI-Powered Platform for Water Refilling Stations',
  description: 'The first AI-powered operating system for water refilling stations in the Philippines. Simplify operations, manage deliveries, and grow your business with Smart Refill.',
  keywords: ['water refilling station', 'business management software', 'delivery management system', 'AI business assistant', 'Philippines', 'small business', 'franchise'],
  authors: [{ name: 'Smart Refill PH', url: 'https://smartrefill.io' }],
  creator: 'Smart Refill PH',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  applicationName: 'Smart Refill',
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smart Refill",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080',
    shortcut: 'https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080',
    apple: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080",
  },
  openGraph: {
    title: 'Smart Refill | AI-Powered Platform for Water Refilling Stations',
    description: 'Simplify operations, manage deliveries, and grow your water refilling station business with our all-in-one, AI-powered platform.',
    url: 'https://app.smartrefill.io',
    siteName: 'Smart Refill',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-stations-main-dashboard.png?alt=media&token=397a8653-f6ba-4fc6-b2c1-2a86e5c53ab8',
        width: 1200,
        height: 630,
        alt: 'Smart Refill Dashboard on multiple devices',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Refill | AI-Powered Platform for Water Refilling Stations',
    description: 'The all-in-one platform to grow your water refilling station business.',
    images: ['https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-stations-main-dashboard.png?alt=media&token=397a8653-f6ba-4fc6-b2c1-2a86e5c53ab8'],
  },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Refill',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'An AI-powered operating system for water refilling stations in the Philippines, designed to simplify operations, manage deliveries, and grow your business.',
    featureList: [
      'Centralized Dashboard',
      'AI-Powered Assistant (Smart Scan)',
      'Customer Management (CRM)',
      'Daily Operations & Transaction Ledger',
      'Inventory & Maintenance Tracking',
      'Team Management with Roles',
      'Invoicing and Payments'
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PHP',
      category: 'Freemium'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Smart Refill PH',
      url: 'https://smartrefill.io'
    },
    url: 'https://app.smartrefill.io'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn("antialiased font-sans", manrope.variable)}>
        <ClientProviders>
            {children}
        </ClientProviders>
      </body>
    </html>
  );
}
