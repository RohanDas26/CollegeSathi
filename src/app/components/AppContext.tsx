import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AppContextType {
  savedColleges: string[];
  compareList: string[];
  recentSearches: string[];
  isAuthenticated: boolean;
  user: User | null;
  currentPage: string;
  sidebarOpen: boolean;
  toggleSave: (id: string) => void;
  toggleCompare: (id: string) => void;
  addSearch: (query: string) => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  setCurrentPage: (page: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedColleges, setSaved] = useState<string[]>(['iit-bombay', 'bits-pilani']);
  const [compareList, setCompare] = useState<string[]>(['iit-bombay', 'iit-delhi']);
  const [recentSearches, setSearches] = useState<string[]>([
    'IIT Bombay CSE',
    'Private Colleges Bangalore',
    'MBA Programs Delhi',
    'Government Colleges Maharashtra',
  ]);
  const [isAuthenticated, setAuth] = useState(true);
  const [user, setUser] = useState<User | null>({
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    avatar: 'AS',
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCompare = (id: string) => {
    setCompare(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const addSearch = (query: string) => {
    if (!query.trim()) return;
    setSearches(prev => [query, ...prev.filter(x => x !== query)].slice(0, 10));
  };

  const login = (email: string, name: string) => {
    setAuth(true);
    setUser({ name, email, avatar: name.split(' ').map(n => n[0]).join('').toUpperCase() });
  };

  const logout = () => {
    setAuth(false);
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      savedColleges, compareList, recentSearches, isAuthenticated, user,
      currentPage, sidebarOpen,
      toggleSave, toggleCompare, addSearch, login, logout,
      setCurrentPage, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
