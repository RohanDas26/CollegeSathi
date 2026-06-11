'use client';
import { AppProvider } from './AppContext';
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Navbar />
      {children}
      <Toaster position="top-right" />
    </AppProvider>
  );
}
