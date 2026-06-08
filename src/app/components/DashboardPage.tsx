import { useState, type ComponentType } from 'react';
import { motion } from 'motion/react';
import {
  Heart, Clock, BarChart3, Sparkles, Star, MapPin, Trash2,
  TrendingUp, Search, ChevronRight, User, Settings, Bell
} from 'lucide-react';
import { colleges } from './data';
import { useApp } from './AppContext';

interface DashboardPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user, savedColleges, compareList, recentSearches, toggleSave, isAuthenticated } = useApp();
  const [activeSection, setActiveSection] = useState('saved');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#0c0c14] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <User className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-white mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>Sign in to access dashboard</h2>
          <p className="text-white/40 mb-5" style={{ fontSize: '13px' }}>Track saved colleges, compare lists, and get recommendations</p>
          <button
            onClick={() => onNavigate('auth')}
            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const saved = colleges.filter(c => savedColleges.includes(c.id));
  const compared = colleges.filter(c => compareList.includes(c.id));
  const recommended = colleges.filter(c => !savedColleges.includes(c.id)).slice(0, 4);

  const sections = [
    { id: 'saved', label: 'Saved Colleges', icon: Heart, count: saved.length },
    { id: 'compare', label: 'Compare List', icon: BarChart3, count: compared.length },
    { id: 'searches', label: 'Recent Searches', icon: Clock, count: recentSearches.length },
    { id: 'recommended', label: 'Recommended', icon: Sparkles, count: recommended.length },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c14]">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0c0c14]/80 sticky top-14 z-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/40" style={{ fontSize: '13px' }}>Good morning</div>
              <h1 className="text-white" style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                {user.name} 👋
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white/70 transition-all">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white/70 transition-all">
                <Settings className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 ml-1" style={{ fontSize: '11px', fontWeight: 600 }}>
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {[
            { label: 'Saved Colleges', value: saved.length, icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/15' },
            { label: 'In Compare', value: compared.length, icon: BarChart3, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/15' },
            { label: 'Searches', value: recentSearches.length, icon: Search, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/15' },
            { label: 'Recommendations', value: recommended.length, icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/15' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`p-4 rounded-xl border ${stat.bg} flex items-center gap-3`}
            >
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <div className="text-white" style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
                <div className="text-white/35 mt-0.5" style={{ fontSize: '11px' }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar navigation */}
          <aside className="w-48 shrink-0 hidden sm:block">
            <div className="sticky top-32 space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                    activeSection === section.id
                      ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300'
                      : 'text-white/45 hover:text-white/65 hover:bg-white/[0.04]'
                  }`}
                  style={{ fontSize: '13px' }}
                >
                  <section.icon className="w-3.5 h-3.5" />
                  {section.label}
                  {section.count > 0 && (
                    <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                      activeSection === section.id ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/[0.06] text-white/30'
                    }`} style={{ fontSize: '10px' }}>
                      {section.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Mobile section tabs */}
          <div className="sm:hidden w-full mb-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === section.id ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300' : 'border border-white/[0.06] text-white/40'
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  <section.icon className="w-3 h-3" />
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {activeSection === 'saved' && (
              <div>
                <SectionHeader title="Saved Colleges" subtitle={`${saved.length} colleges saved`} />
                {saved.length === 0 ? (
                  <EmptyState
                    icon={Heart}
                    title="No saved colleges yet"
                    desc="Browse colleges and click 'Save' to add them here"
                    action="Browse Colleges"
                    onAction={() => onNavigate('colleges')}
                  />
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {saved.map((college, i) => (
                      <CollegeCard
                        key={college.id}
                        college={college}
                        i={i}
                        onNavigate={onNavigate}
                        onRemove={() => toggleSave(college.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'compare' && (
              <div>
                <SectionHeader title="Compare List" subtitle={`${compared.length} of 3 slots used`} />
                {compared.length === 0 ? (
                  <EmptyState
                    icon={BarChart3}
                    title="No colleges in compare list"
                    desc="Add colleges to compare them side by side"
                    action="Browse Colleges"
                    onAction={() => onNavigate('colleges')}
                  />
                ) : (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2 mb-4">
                      {compared.map((college, i) => (
                        <CollegeCard
                          key={college.id}
                          college={college}
                          i={i}
                          onNavigate={onNavigate}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => onNavigate('compare')}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all"
                      style={{ fontSize: '14px', fontWeight: 500 }}
                    >
                      <BarChart3 className="w-4 h-4" />
                      View Full Comparison
                    </button>
                  </>
                )}
              </div>
            )}

            {activeSection === 'searches' && (
              <div>
                <SectionHeader title="Recent Searches" subtitle="Your search history" />
                {recentSearches.length === 0 ? (
                  <EmptyState
                    icon={Search}
                    title="No recent searches"
                    desc="Your search history will appear here"
                    action="Search Colleges"
                    onAction={() => onNavigate('colleges')}
                  />
                ) : (
                  <div className="space-y-2">
                    {recentSearches.map((search, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => onNavigate('colleges')}
                        className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center">
                          <Search className="w-3.5 h-3.5 text-white/30" />
                        </div>
                        <span className="flex-1 text-white/60" style={{ fontSize: '13px' }}>{search}</span>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'recommended' && (
              <div>
                <SectionHeader title="Recommended for You" subtitle="Based on your preferences and searches" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {recommended.map((college, i) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      i={i}
                      onNavigate={onNavigate}
                      badge={<span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" style={{ fontSize: '10px' }}>Recommended</span>}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-white mb-0.5" style={{ fontSize: '17px', fontWeight: 600 }}>{title}</h2>
      <p className="text-white/35" style={{ fontSize: '12px' }}>{subtitle}</p>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc, action, onAction }: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-white/[0.08]">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-white/25" />
      </div>
      <div className="text-white/50 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>{title}</div>
      <div className="text-white/25 mb-5 max-w-xs" style={{ fontSize: '12px' }}>{desc}</div>
      <button
        onClick={onAction}
        className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/15 transition-all"
        style={{ fontSize: '13px' }}
      >
        {action}
      </button>
    </div>
  );
}

function CollegeCard({ college, i, onNavigate, onRemove, badge }: {
  college: typeof colleges[0];
  i: number;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onRemove?: () => void;
  badge?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all overflow-hidden"
    >
      <div className="relative h-28 overflow-hidden">
        <img src={college.image} alt={college.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-[#0c0c14]/30 to-transparent" />
        {badge && <div className="absolute top-2 left-2">{badge}</div>}
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/30 transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
      <div
        className="p-4 cursor-pointer"
        onClick={() => onNavigate('college-detail', { id: college.id })}
      >
        <div className="flex items-start gap-2.5 mb-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: college.logoColor + '20', color: college.logoColor, fontSize: '9px', fontWeight: 700 }}
          >
            {college.logoInitials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white truncate" style={{ fontSize: '13px', fontWeight: 500 }}>{college.shortName}</div>
            <div className="flex items-center gap-1 text-white/35 mt-0.5" style={{ fontSize: '11px' }}>
              <MapPin className="w-3 h-3" />
              {college.city}
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white" style={{ fontSize: '12px', fontWeight: 500 }}>{college.rating}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-white/[0.05]">
          <div className="text-center">
            <div className="text-white" style={{ fontSize: '12px', fontWeight: 600 }}>₹{college.annualFees}L</div>
            <div className="text-white/30" style={{ fontSize: '10px' }}>Fees</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400" style={{ fontSize: '12px', fontWeight: 600 }}>{college.placementPercentage}%</div>
            <div className="text-white/30" style={{ fontSize: '10px' }}>Placed</div>
          </div>
          <div className="text-center">
            <div className="text-white" style={{ fontSize: '12px', fontWeight: 600 }}>#{college.nirfRanking}</div>
            <div className="text-white/30" style={{ fontSize: '10px' }}>NIRF</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
