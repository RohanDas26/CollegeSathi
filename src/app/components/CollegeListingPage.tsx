import { useState, useMemo, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, SlidersHorizontal, MapPin, Star, Heart, BarChart3,
  ChevronDown, Grid3X3, List, X, CheckCircle2
} from 'lucide-react';
import { colleges, CollegeType, DegreeType } from './data';
import { useApp } from './AppContext';

interface CollegeListingPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const states = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Rajasthan', 'West Bengal'];
const courseOptions = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'MBA', 'B.Sc'];
const degreeOptions: DegreeType[] = ['B.Tech', 'M.Tech', 'MBA', 'PhD', 'M.Sc', 'B.Sc'];

interface Filters {
  search: string;
  states: string[];
  minFees: number;
  maxFees: number;
  minRating: number;
  courses: string[];
  degreeTypes: DegreeType[];
  minPlacement: number;
  types: CollegeType[];
}

export function CollegeListingPage({ onNavigate }: CollegeListingPageProps) {
  const { savedColleges, compareList, toggleSave, toggleCompare } = useApp();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState<'nirf' | 'rating' | 'fees-asc' | 'fees-desc' | 'placement'>('nirf');
  const [filters, setFilters] = useState<Filters>({
    search: '',
    states: [],
    minFees: 0,
    maxFees: 20,
    minRating: 0,
    courses: [],
    degreeTypes: [],
    minPlacement: 0,
    types: [],
  });

  const filtered = useMemo(() => {
    let result = colleges.filter(c => {
      if (filters.search && !c.name.toLowerCase().includes(filters.search.toLowerCase()) && !c.shortName.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.states.length > 0 && !filters.states.includes(c.state)) return false;
      if (c.annualFees > filters.maxFees) return false;
      if (c.rating < filters.minRating) return false;
      if (filters.courses.length > 0 && !filters.courses.some(course => c.courses.includes(course))) return false;
      if (filters.degreeTypes.length > 0 && !filters.degreeTypes.some(dt => c.degreeTypes.includes(dt))) return false;
      if (c.placementPercentage < filters.minPlacement) return false;
      if (filters.types.length > 0 && !filters.types.includes(c.type)) return false;
      return true;
    });

    return result.sort((a, b) => {
      if (sortBy === 'nirf') return a.nirfRanking - b.nirfRanking;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fees-asc') return a.annualFees - b.annualFees;
      if (sortBy === 'fees-desc') return b.annualFees - a.annualFees;
      if (sortBy === 'placement') return b.placementPercentage - a.placementPercentage;
      return 0;
    });
  }, [filters, sortBy]);

  const activeFilterCount = [
    filters.states.length, filters.courses.length, filters.degreeTypes.length, filters.types.length,
    filters.minRating > 0 ? 1 : 0, filters.minPlacement > 0 ? 1 : 0,
    filters.maxFees < 20 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const toggleFilter = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const clearFilters = () => setFilters({ search: '', states: [], minFees: 0, maxFees: 20, minRating: 0, courses: [], degreeTypes: [], minPlacement: 0, types: [] });

  return (
    <div className="min-h-screen bg-[#0c0c14]">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] bg-[#0c0c14]/80 sticky top-14 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 focus-within:border-indigo-500/40 transition-all">
            <Search className="w-4 h-4 text-white/30 shrink-0" />
            <input
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              placeholder="Search colleges..."
              className="flex-1 bg-transparent text-white placeholder-white/25 outline-none"
              style={{ fontSize: '14px' }}
            />
            {filters.search && (
              <button onClick={() => setFilters(f => ({ ...f, search: '' }))} className="text-white/30 hover:text-white/60">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-150 ${
              sidebarOpen ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400' : 'border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white/70'
            }`}
            style={{ fontSize: '13px' }}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center" style={{ fontSize: '10px' }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-1 ml-auto">
            <span className="text-white/30 mr-2" style={{ fontSize: '13px' }}>{filtered.length} results</span>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all duration-150 ${view === 'grid' ? 'bg-white/[0.08] text-white' : 'text-white/35 hover:text-white/60'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all duration-150 ${view === 'list' ? 'bg-white/[0.08] text-white' : 'text-white/35 hover:text-white/60'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white/[0.03] border border-white/[0.08] text-white/60 rounded-xl px-3 py-2 outline-none"
            style={{ fontSize: '13px' }}
          >
            <option value="nirf">NIRF Rank</option>
            <option value="rating">Top Rated</option>
            <option value="fees-asc">Fees: Low to High</option>
            <option value="fees-desc">Fees: High to Low</option>
            <option value="placement">Best Placement</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              key="sidebar"
              initial={{ opacity: 0, x: -16, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 264 }}
              exit={{ opacity: 0, x: -16, width: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 overflow-hidden"
              style={{ width: 264 }}
            >
              <div className="w-64 sticky top-28 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-white" style={{ fontSize: '14px', fontWeight: 500 }}>Filters</span>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-indigo-400 hover:text-indigo-300 transition-colors" style={{ fontSize: '12px' }}>
                      Clear all
                    </button>
                  )}
                </div>

                <FilterSection title="Ownership Type">
                  {(['Government', 'Private', 'Deemed'] as CollegeType[]).map(type => (
                    <FilterChip
                      key={type}
                      label={type}
                      active={filters.types.includes(type)}
                      onClick={() => setFilters(f => ({ ...f, types: toggleFilter(f.types, type) }))}
                    />
                  ))}
                </FilterSection>

                <FilterSection title="State / Location">
                  {states.map(state => (
                    <FilterChip
                      key={state}
                      label={state}
                      active={filters.states.includes(state)}
                      onClick={() => setFilters(f => ({ ...f, states: toggleFilter(f.states, state) }))}
                    />
                  ))}
                </FilterSection>

                <FilterSection title="Degree Type">
                  {degreeOptions.map(deg => (
                    <FilterChip
                      key={deg}
                      label={deg}
                      active={filters.degreeTypes.includes(deg)}
                      onClick={() => setFilters(f => ({ ...f, degreeTypes: toggleFilter(f.degreeTypes, deg) }))}
                    />
                  ))}
                </FilterSection>

                <FilterSection title="Annual Fees (Lakhs)">
                  <div className="px-1">
                    <input
                      type="range"
                      min={0}
                      max={20}
                      value={filters.maxFees}
                      onChange={e => setFilters(f => ({ ...f, maxFees: Number(e.target.value) }))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex items-center justify-between text-white/40 mt-1" style={{ fontSize: '12px' }}>
                      <span>₹0</span>
                      <span>Up to ₹{filters.maxFees}L</span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Minimum Rating">
                  <div className="flex gap-1.5">
                    {[0, 3, 3.5, 4, 4.5].map(r => (
                      <button
                        key={r}
                        onClick={() => setFilters(f => ({ ...f, minRating: r }))}
                        className={`flex-1 py-1.5 rounded-lg border transition-all duration-150 ${
                          filters.minRating === r
                            ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                            : 'border-white/[0.06] text-white/35 hover:text-white/55'
                        }`}
                        style={{ fontSize: '11px' }}
                      >
                        {r === 0 ? 'Any' : `${r}+`}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Min. Placement %">
                  <div className="px-1">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={filters.minPlacement}
                      onChange={e => setFilters(f => ({ ...f, minPlacement: Number(e.target.value) }))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex items-center justify-between text-white/40 mt-1" style={{ fontSize: '12px' }}>
                      <span>0%</span>
                      <span>{filters.minPlacement}%+</span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Courses Offered">
                  {courseOptions.map(course => (
                    <FilterChip
                      key={course}
                      label={course}
                      active={filters.courses.includes(course)}
                      onClick={() => setFilters(f => ({ ...f, courses: toggleFilter(f.courses, course) }))}
                    />
                  ))}
                </FilterSection>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-white/25" />
              </div>
              <div className="text-white/50 mb-2" style={{ fontSize: '15px' }}>No colleges found</div>
              <div className="text-white/25 mb-5" style={{ fontSize: '13px' }}>Try adjusting your filters</div>
              <button onClick={clearFilters} className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/15 transition-all" style={{ fontSize: '13px' }}>
                Clear Filters
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className={`grid gap-4 ${sidebarOpen ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              <AnimatePresence mode="popLayout">
                {filtered.map((college, i) => (
                  <motion.div
                    key={college.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    whileHover={{ y: -3 }}
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200 overflow-hidden cursor-pointer"
                    onClick={() => onNavigate('college-detail', { id: college.id })}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img src={college.image} alt={college.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-[#0c0c14]/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-black/50 border border-white/10 text-white/80" style={{ fontSize: '10px' }}>
                          #{college.nirfRanking} NIRF
                        </span>
                        <span className={`px-2 py-0.5 rounded-full border ${
                          college.type === 'Government' ? 'border-emerald-500/30 bg-emerald-900/60 text-emerald-400' :
                          college.type === 'Deemed' ? 'border-violet-500/30 bg-violet-900/60 text-violet-400' :
                          'border-blue-500/30 bg-blue-900/60 text-blue-400'
                        }`} style={{ fontSize: '10px' }}>
                          {college.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start gap-2.5 mb-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
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

                      <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-white/[0.05]">
                        <Stat label="Fees/yr" value={`₹${college.annualFees}L`} />
                        <Stat label="Placed" value={`${college.placementPercentage}%`} valueClass="text-emerald-400" />
                        <Stat label="Avg Pkg" value={`₹${college.averagePackage}L`} />
                      </div>

                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => toggleSave(college.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border transition-all duration-150 ${
                            savedColleges.includes(college.id)
                              ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                              : 'border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/[0.12]'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          <Heart className={`w-3 h-3 ${savedColleges.includes(college.id) ? 'fill-rose-400' : ''}`} />
                          {savedColleges.includes(college.id) ? 'Saved' : 'Save'}
                        </button>
                        <button
                          onClick={() => toggleCompare(college.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border transition-all duration-150 ${
                            compareList.includes(college.id)
                              ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
                              : 'border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/[0.12]'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          <BarChart3 className="w-3 h-3" />
                          {compareList.includes(college.id) ? 'Added' : 'Compare'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((college, i) => (
                  <motion.div
                    key={college.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, delay: i * 0.02 }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200 cursor-pointer"
                    onClick={() => onNavigate('college-detail', { id: college.id })}
                  >
                    <img src={college.image} alt={college.name} className="w-16 h-12 rounded-xl object-cover shrink-0" />
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: college.logoColor + '20', color: college.logoColor, fontSize: '10px', fontWeight: 700 }}
                    >
                      {college.logoInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white" style={{ fontSize: '14px', fontWeight: 500 }}>{college.shortName}</span>
                        <span className={`px-1.5 py-0.5 rounded text-white ${
                          college.type === 'Government' ? 'bg-emerald-500/10 text-emerald-400' :
                          college.type === 'Deemed' ? 'bg-violet-500/10 text-violet-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`} style={{ fontSize: '10px' }}>
                          {college.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-white/35" style={{ fontSize: '12px' }}>
                        <MapPin className="w-3 h-3" />
                        {college.location}
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 shrink-0">
                      <Stat label="Fees/yr" value={`₹${college.annualFees}L`} />
                      <Stat label="Placed" value={`${college.placementPercentage}%`} valueClass="text-emerald-400" />
                      <Stat label="Avg Pkg" value={`₹${college.averagePackage}L`} />
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-white" style={{ fontSize: '13px', fontWeight: 500 }}>{college.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => toggleSave(college.id)}
                        className={`p-2 rounded-lg border transition-all duration-150 ${
                          savedColleges.includes(college.id)
                            ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                            : 'border-white/[0.06] text-white/35 hover:text-white/60'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${savedColleges.includes(college.id) ? 'fill-rose-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleCompare(college.id)}
                        className={`p-2 rounded-lg border transition-all duration-150 ${
                          compareList.includes(college.id)
                            ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
                            : 'border-white/[0.06] text-white/35 hover:text-white/60'
                        }`}
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      {/* Compare Bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-[#141420]/95 backdrop-blur-xl p-4"
          >
            <div className="max-w-7xl mx-auto flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1 flex-wrap">
                <span className="text-white/50" style={{ fontSize: '13px' }}>Comparing:</span>
                {compareList.map(id => {
                  const c = colleges.find(c => c.id === id);
                  if (!c) return null;
                  return (
                    <div key={id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300" style={{ fontSize: '12px' }}>
                      {c.shortName}
                      <button onClick={() => toggleCompare(id)} className="text-indigo-400/60 hover:text-indigo-400">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => onNavigate('compare')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150 shrink-0"
                style={{ fontSize: '13px', fontWeight: 500 }}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Compare {compareList.length} Colleges
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-white/70 hover:text-white transition-colors"
        style={{ fontSize: '13px', fontWeight: 500 }}
      >
        {title}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 flex flex-wrap gap-1.5 border-t border-white/[0.04]" style={{ paddingTop: '10px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-150 ${
        active
          ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300'
          : 'border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/[0.12]'
      }`}
      style={{ fontSize: '12px' }}
    >
      {active && <CheckCircle2 className="w-3 h-3" />}
      {label}
    </button>
  );
}

function Stat({ label, value, valueClass = 'text-white' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="text-center">
      <div className={valueClass} style={{ fontSize: '13px', fontWeight: 600 }}>{value}</div>
      <div className="text-white/30" style={{ fontSize: '10px' }}>{label}</div>
    </div>
  );
}
