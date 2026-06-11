'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, Bell, ChevronDown, ChevronRight, Star, GraduationCap, Building2, BookOpen, Scale, Stethoscope } from 'lucide-react';
import { useApp } from '../AppContext';
import toast from 'react-hot-toast';

export function Navbar() {
  const pathname = usePathname();
  const { compareList } = useApp();
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Engineering');

  const handleAction = (action: string) => {
    toast.success(`${action} feature coming soon!`);
  };

  const categories = [
    { id: 'Engineering', icon: <Building2 className="w-4 h-4" /> },
    { id: 'Medicine', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'Management', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Design', icon: <Star className="w-4 h-4" /> },
    { id: 'Law', icon: <Scale className="w-4 h-4" /> }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">College Sathi</span>
          </Link>

          <div className="hidden md:flex items-center">
            {/* Discover Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDiscoverOpen(true)}
              onMouseLeave={() => setDiscoverOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                Discover <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Mega Menu */}
              {discoverOpen && (
                <div className="absolute top-full left-0 w-[600px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex z-50">
                  {/* Sidebar */}
                  <div className="w-1/3 border-r border-slate-100 py-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                          activeCategory === cat.id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className={activeCategory === cat.id ? 'text-blue-600' : 'text-slate-400'}>
                          {cat.icon}
                        </span>
                        {cat.id}
                      </button>
                    ))}
                  </div>
                  {/* Content Area */}
                  <div className="w-2/3 p-8 flex gap-8">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900 mb-4">Top {activeCategory} Exams</h4>
                      <ul className="space-y-3">
                        {['JEE Main 2025', 'JEE Advanced 2025', 'BITSAT 2025', 'VITEEE 2025'].map(item => (
                          <li key={item}>
                            <Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900 mb-4">Top Colleges</h4>
                      <ul className="space-y-3">
                        {['Top IITs in India', 'Top NITs in India', 'Best Private Engineering Colleges', 'Top State Universities'].map(item => (
                          <li key={item}>
                            <Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Explore All link at bottom */}
                  <div className="absolute bottom-0 left-1/3 right-0 p-4 border-t border-slate-100 bg-white">
                    <Link href="/colleges" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                      Explore all {activeCategory} resources <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/colleges" className={`px-4 py-2 text-sm font-medium transition-colors ${pathname === '/colleges' ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'}`}>
              Colleges
            </Link>
            
            <Link href="/compare" className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${pathname === '/compare' ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'}`}>
              Compare 
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                {compareList.length}
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all w-64">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search colleges..." 
              className="bg-transparent border-none outline-none text-sm px-2 w-full text-slate-900 placeholder:text-slate-400"
            />
            <div className="flex items-center justify-center w-5 h-5 bg-white border border-slate-200 rounded text-slate-400 text-[10px] font-bold">
              ⌘
            </div>
          </div>

          <button onClick={() => handleAction('Wishlist')} className="text-slate-400 hover:text-slate-600 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          
          <button onClick={() => handleAction('Notifications')} className="text-slate-400 hover:text-slate-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <Link href="/login" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            Sign In
          </Link>
        </div>

      </div>
    </nav>
  );
}
