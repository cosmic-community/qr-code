import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import CosmicBadge from '@/components/CosmicBadge';

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Generate, customize, and save QR codes with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📱</text></svg>"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="font-sans antialiased text-gray-900 min-h-screen">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}