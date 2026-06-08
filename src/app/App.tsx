import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider } from './components/AppContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { CollegeListingPage } from './components/CollegeListingPage';
import { CollegeDetailPage } from './components/CollegeDetailPage';
import { ComparePage } from './components/ComparePage';
import { AuthPage } from './components/AuthPage';
import { DashboardPage } from './components/DashboardPage';

type Page =
  | { id: 'home' }
  | { id: 'colleges' }
  | { id: 'college-detail'; collegeId: string }
  | { id: 'compare' }
  | { id: 'auth' }
  | { id: 'dashboard' };

function AppShell() {
  const [page, setPage] = useState<Page>({ id: 'home' });

  const navigate = (pageId: string, params?: Record<string, string>) => {
    if (pageId === 'college-detail' && params?.id) {
      setPage({ id: 'college-detail', collegeId: params.id });
    } else if (pageId === 'colleges') {
      setPage({ id: 'colleges' });
    } else if (pageId === 'compare') {
      setPage({ id: 'compare' });
    } else if (pageId === 'auth') {
      setPage({ id: 'auth' });
    } else if (pageId === 'dashboard') {
      setPage({ id: 'dashboard' });
    } else {
      setPage({ id: 'home' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPageId = page.id === 'college-detail' ? 'colleges' : page.id;

  return (
    <div className="dark min-h-screen bg-[#0c0c14]">
      {page.id !== 'auth' && (
        <Navigation currentPage={currentPageId} onNavigate={navigate} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={page.id + (page.id === 'college-detail' ? page.collegeId : '')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {page.id === 'home' && <HomePage onNavigate={navigate} />}
          {page.id === 'colleges' && <CollegeListingPage onNavigate={navigate} />}
          {page.id === 'college-detail' && (
            <CollegeDetailPage collegeId={page.collegeId} onNavigate={navigate} />
          )}
          {page.id === 'compare' && <ComparePage onNavigate={navigate} />}
          {page.id === 'auth' && <AuthPage onNavigate={navigate} />}
          {page.id === 'dashboard' && <DashboardPage onNavigate={navigate} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
