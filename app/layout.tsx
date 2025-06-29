import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import CustomCursor from '@/components/ui/customCursor'; // 👈 1. Import the cursor component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Delogi - Luxury Authenticity, Secured by Algorand',
  description: 'The future of luxury goods authentication and provenance tracking powered by blockchain technology.',
  keywords: ['luxury', 'authentication', 'blockchain', 'algorand', 'provenance'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor /> {/* 👈 2. Add the component here */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}