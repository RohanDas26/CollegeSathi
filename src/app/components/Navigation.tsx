import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, BookOpen, BarChart3, Compass, X, Menu, Star, LogOut, User, Heart } from 'lucide-react';
import { useApp } from './AppContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user, isAuthenticated, compareList, savedColleges, logout } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'home', label: 'Discover', icon: Compass },
    { id: 'colleges', label: 'Colleges', icon: BookOpen },
    { id: 'compare', label: 'Compare', icon: BarChart3 },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0c0c14]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 gap-6">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-white font-semibold tracking-tight hidden sm:block" style={{ fontSize: '15px' }}>
                CollegeIQ
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 flex-1">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-2 ${
                    currentPage === link.id
                      ? 'text-white bg-white/[0.06]'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                  }`}
                  style={{ fontSize: '14px' }}
                >
                  {currentPage === link.id && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 rounded-lg bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {link.id === 'compare' && compareList.length > 0 && (
                    <span className="relative z-10 w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center" style={{ fontSize: '10px' }}>
                      {compareList.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/[0.12] transition-all duration-150 hidden sm:flex"
                style={{ fontSize: '13px' }}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search colleges...</span>
                <kbd className="ml-4 px-1.5 py-0.5 rounded text-white/25 bg-white/[0.04] border border-white/[0.06]" style={{ fontSize: '11px' }}>⌘K</kbd>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150 sm:hidden"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Saved */}
              <button
                onClick={() => onNavigate('dashboard')}
                className="relative p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150"
              >
                <Heart className="w-4 h-4" />
                {savedColleges.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-indigo-500 text-white flex items-center justify-center" style={{ fontSize: '9px' }}>
                    {savedColleges.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150 hidden sm:flex">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </button>

              {/* Profile */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.06] transition-all duration-150"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400" style={{ fontSize: '10px', fontWeight: 600 }}>
                      {user.avatar}
                    </div>
                    <span className="text-white/60 hidden md:block" style={{ fontSize: '13px' }}>{user.name.split(' ')[0]}</span>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/[0.08] bg-[#141420] shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-3 border-b border-white/[0.06]">
                            <div className="text-white" style={{ fontSize: '13px', fontWeight: 500 }}>{user.name}</div>
                            <div className="text-white/40 mt-0.5" style={{ fontSize: '12px' }}>{user.email}</div>
                          </div>
                          <div className="p-1.5">
                            <button
                              onClick={() => { onNavigate('dashboard'); setProfileOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-150 text-left"
                              style={{ fontSize: '13px' }}
                            >
                              <User className="w-3.5 h-3.5" />
                              My Dashboard
                            </button>
                            <button
                              onClick={() => { onNavigate('dashboard'); setProfileOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-150 text-left"
                              style={{ fontSize: '13px' }}
                            >
                              <Heart className="w-3.5 h-3.5" />
                              Saved Colleges
                              <span className="ml-auto text-indigo-400">{savedColleges.length}</span>
                            </button>
                          </div>
                          <div className="p-1.5 border-t border-white/[0.06]">
                            <button
                              onClick={() => { logout(); setProfileOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-150 text-left"
                              style={{ fontSize: '13px' }}
                            >
                              <LogOut className="w-3.5 h-3.5" />
                              Sign out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => onNavigate('auth')}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                >
                  Sign in
                </button>
              )}

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-150 md:hidden"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/[0.06] overflow-hidden md:hidden"
            >
              <div className="p-3 space-y-1">
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150 text-left ${
                      currentPage === link.id ? 'text-white bg-white/[0.08]' : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                    }`}
                    style={{ fontSize: '14px' }}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setSearchOpen(false)}
            />
            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-20 px-4">
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#141420] shadow-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
                  <Search className="w-4 h-4 text-white/30" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search colleges, courses, locations..."
                    className="flex-1 bg-transparent text-white placeholder-white/25 outline-none"
                    style={{ fontSize: '15px' }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                  />
                  <button onClick={() => setSearchOpen(false)} className="p-1 rounded text-white/30 hover:text-white/60 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3">
                  <div className="text-white/30 px-2 pb-2" style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Quick Links
                  </div>
                  {['IIT Bombay', 'Computer Science Colleges', 'MBA Programs', 'Government Colleges', 'Top Placements'].map(item => (
                    <button
                      key={item}
                      onClick={() => setSearchOpen(false)}
                      className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-150 text-left"
                      style={{ fontSize: '14px' }}
                    >
                      <Search className="w-3.5 h-3.5 shrink-0 text-white/25" />
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
