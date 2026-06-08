import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search, MapPin, BookOpen, TrendingUp, ArrowRight,
  Star, Users, Award, Zap, ChevronRight
} from 'lucide-react';
import { colleges, popularSearches, trendingColleges } from './data';
import { useApp } from './AppContext';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const stats = [
  { label: 'Colleges Listed', value: '10,000+', icon: BookOpen },
  { label: 'Students Helped', value: '2M+', icon: Users },
  { label: 'Verified Reviews', value: '500K+', icon: Star },
  { label: 'Success Rate', value: '94%', icon: Award },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const { addSearch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'college' | 'location' | 'course'>('college');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      addSearch(searchQuery);
    }
    onNavigate('colleges');
  };

  return (
    <div className="min-h-screen bg-[#0c0c14]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-indigo-500/[0.06] blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] text-indigo-400 mb-8" style={{ fontSize: '12px' }}>
              <Zap className="w-3 h-3 fill-indigo-400" />
              <span>AI-powered college matching for 2025–26</span>
            </div>

            <h1
              className="text-white mb-5 leading-[1.15] tracking-tight"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Discover the Right College<br />
              <span className="text-indigo-400">for Your Future</span>
            </h1>

            <p className="text-white/40 max-w-xl mx-auto mb-10" style={{ fontSize: '17px', lineHeight: '1.6' }}>
              Search, compare, and apply to the best colleges in India. Make data-driven decisions with real student reviews, placement data, and scholarship information.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 w-fit mx-auto mb-3">
              {(['college', 'location', 'course'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg capitalize transition-all duration-150 ${
                    activeTab === tab
                      ? 'bg-indigo-500 text-white'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                  style={{ fontSize: '13px' }}
                >
                  {tab === 'college' ? 'College' : tab === 'location' ? 'Location' : 'Course'}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="flex items-center gap-0 rounded-2xl border border-white/[0.1] bg-white/[0.04] overflow-hidden focus-within:border-indigo-500/40 focus-within:bg-indigo-500/[0.04] transition-all duration-200 shadow-lg shadow-black/20">
              <div className="pl-5 pr-3">
                {activeTab === 'college' && <Search className="w-4.5 h-4.5 text-white/30" style={{ width: '18px', height: '18px' }} />}
                {activeTab === 'location' && <MapPin className="w-4.5 h-4.5 text-white/30" style={{ width: '18px', height: '18px' }} />}
                {activeTab === 'course' && <BookOpen className="w-4.5 h-4.5 text-white/30" style={{ width: '18px', height: '18px' }} />}
              </div>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder={
                  activeTab === 'college' ? 'Search for IIT, NIT, BITS, VIT...'
                  : activeTab === 'location' ? 'City, state or pin code...'
                  : 'Computer Science, MBA, Architecture...'
                }
                className="flex-1 bg-transparent py-4 text-white placeholder-white/25 outline-none"
                style={{ fontSize: '15px' }}
              />
              <div className="pr-2">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150 active:scale-[0.97]"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  Search
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-white/25" style={{ fontSize: '12px' }}>Popular:</span>
              {popularSearches.slice(0, 5).map(s => (
                <button
                  key={s}
                  onClick={() => { setSearchQuery(s); onNavigate('colleges'); }}
                  className="px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/40 hover:text-white/60 hover:border-white/[0.12] transition-all duration-150"
                  style={{ fontSize: '12px' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="border-y border-white/[0.05] bg-white/[0.015]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <stat.icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="text-white" style={{ fontSize: '18px', fontWeight: 700 }}>{stat.value}</div>
                  <div className="text-white/35" style={{ fontSize: '12px' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trending Colleges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2" style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              <TrendingUp className="w-3.5 h-3.5" />
              Trending Now
            </div>
            <h2 className="text-white" style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              Top Colleges This Season
            </h2>
          </div>
          <button
            onClick={() => onNavigate('colleges')}
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
            style={{ fontSize: '13px' }}
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingColleges.map((college, i) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => onNavigate('college-detail', { id: college.id })}
              className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-[#0c0c14]/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-white border ${
                    college.type === 'Government' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                    college.type === 'Deemed' ? 'border-violet-500/30 bg-violet-500/10 text-violet-400' :
                    'border-blue-500/30 bg-blue-500/10 text-blue-400'
                  }`} style={{ fontSize: '10px', fontWeight: 500 }}>
                    {college.type}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-full bg-black/50 border border-white/10 text-white/80" style={{ fontSize: '10px' }}>
                    #{college.nirfRanking} NIRF
                  </span>
                </div>
              </div>

              <div className="p-4">
                {/* Logo + Name */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: college.logoColor + '22', fontSize: '10px', fontWeight: 700, color: college.logoColor }}
                  >
                    {college.logoInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white truncate" style={{ fontSize: '14px', fontWeight: 500, lineHeight: '1.3' }}>
                      {college.shortName}
                    </div>
                    <div className="flex items-center gap-1 text-white/40 mt-0.5" style={{ fontSize: '12px' }}>
                      <MapPin className="w-3 h-3" />
                      {college.city}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 shrink-0">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white" style={{ fontSize: '13px', fontWeight: 500 }}>{college.rating}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06]">
                  <div>
                    <div className="text-white" style={{ fontSize: '13px', fontWeight: 600 }}>₹{college.annualFees}L</div>
                    <div className="text-white/30" style={{ fontSize: '10px' }}>Annual Fees</div>
                  </div>
                  <div>
                    <div className="text-emerald-400" style={{ fontSize: '13px', fontWeight: 600 }}>{college.placementPercentage}%</div>
                    <div className="text-white/30" style={{ fontSize: '10px' }}>Placement</div>
                  </div>
                  <div>
                    <div className="text-white" style={{ fontSize: '13px', fontWeight: 600 }}>₹{college.averagePackage}L</div>
                    <div className="text-white/30" style={{ fontSize: '10px' }}>Avg Package</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured - Top Picks */}
      <section className="border-t border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 mb-2" style={{ fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <Award className="w-3.5 h-3.5" />
                Editor's Choice
              </div>
              <h2 className="text-white" style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                Premium Institutions
              </h2>
            </div>
            <button
              onClick={() => onNavigate('colleges')}
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
              style={{ fontSize: '13px' }}
            >
              Explore all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* List style */}
          <div className="space-y-2">
            {colleges.slice(0, 6).map((college, i) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ x: 4 }}
                onClick={() => onNavigate('college-detail', { id: college.id })}
                className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200 cursor-pointer"
              >
                <span className="text-white/20 w-6 text-right shrink-0" style={{ fontSize: '13px', fontWeight: 600 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: college.logoColor + '18', color: college.logoColor, fontSize: '11px', fontWeight: 700 }}
                >
                  {college.logoInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white" style={{ fontSize: '14px', fontWeight: 500 }}>{college.shortName}</span>
                    <span className={`px-1.5 py-0.5 rounded text-white shrink-0 ${
                      college.type === 'Government' ? 'bg-emerald-500/10 text-emerald-400' :
                      college.type === 'Deemed' ? 'bg-violet-500/10 text-violet-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`} style={{ fontSize: '10px' }}>
                      {college.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-white/35 mt-0.5" style={{ fontSize: '12px' }}>
                    <MapPin className="w-3 h-3" />
                    {college.location}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <div className="text-white" style={{ fontSize: '13px', fontWeight: 600 }}>₹{college.annualFees}L</div>
                    <div className="text-white/30" style={{ fontSize: '10px' }}>Fees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-400" style={{ fontSize: '13px', fontWeight: 600 }}>{college.placementPercentage}%</div>
                    <div className="text-white/30" style={{ fontSize: '10px' }}>Placed</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white" style={{ fontSize: '13px', fontWeight: 500 }}>{college.rating}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.4]" style={{
            backgroundImage: `radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.15) 0%, transparent 70%)`,
          }} />
          <div className="relative">
            <h2 className="text-white mb-3" style={{ fontSize: '26px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              Find Your Perfect College Match
            </h2>
            <p className="text-white/45 mb-7 max-w-md mx-auto" style={{ fontSize: '15px' }}>
              Take our 3-minute quiz to get personalized college recommendations based on your profile and goals.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('colleges')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150 active:scale-[0.97]"
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
                Explore Colleges
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-150"
                style={{ fontSize: '14px' }}
              >
                Compare Colleges
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="text-white/40" style={{ fontSize: '13px' }}>CollegeIQ © 2026</span>
          </div>
          <div className="flex items-center gap-5">
            {['About', 'Privacy', 'Terms', 'Contact'].map(link => (
              <button key={link} className="text-white/30 hover:text-white/55 transition-colors" style={{ fontSize: '13px' }}>
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
