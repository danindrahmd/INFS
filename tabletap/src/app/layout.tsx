import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TableTap - QR Code Restaurant Ordering System',
  description: 'Streamline your restaurant ordering process with QR code menus',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
