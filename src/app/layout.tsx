import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CompanyProvider } from '@/contexts/CompanyContext';
import { ToastProvider } from '@/components/ui/use-toast'; // <-- import here

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Ashtha Enterprises',
    template: '%s | Ashtha Enterprises',
  },
  description: 'Comprehensive sales, stock, and customer management system',
  icons: {
    icon: '/inventory-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CompanyProvider>
            <ToastProvider> {/* <-- wrap children with ToastProvider */}
              {children}
            </ToastProvider>
          </CompanyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
