'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface AppContextType {
  compareList: string[];
  toggleCompare: (id: string) => void;
  savedColleges: string[];
  toggleSave: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  
  // Simulate login state for notifications
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        toast.success('Removed from compare list');
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 3) {
        toast.error('You can only compare up to 3 colleges');
        return prev;
      }
      toast.success('Added to compare list');
      return [...prev, id];
    });
  };

  const toggleSave = (id: string) => {
    if (!isLoggedIn) {
      toast.error(
        <div>
          <span className="font-bold block">Please sign in</span>
          <span className="text-sm">You need to be logged in to save colleges</span>
        </div>,
        { duration: 4000 }
      );
      return;
    }
    setSavedColleges(prev => {
      if (prev.includes(id)) {
        toast.success('Removed from wishlist');
        return prev.filter(x => x !== id);
      }
      toast.success('Saved to wishlist');
      return [...prev, id];
    });
  };

  return (
    <AppContext.Provider value={{ compareList, toggleCompare, savedColleges, toggleSave }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
