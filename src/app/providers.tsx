'use client';
import { SessionProvider } from 'next-auth/react';
import { AppProvider } from './AppContext';
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider>
        <Navbar />
        {children}
        <Toaster position="top-right" />
      </AppProvider>
    </SessionProvider>
  );
}
