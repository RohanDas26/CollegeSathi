'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Search, MapPin, Heart, Star, ChevronDown, Filter, ChevronRight } from 'lucide-react';
import { colleges } from '../data';
import { useApp } from '../AppContext';

export default function CollegesPage() {
  const { savedColleges, toggleSave } = useApp();
  const [search, setSearch] = useState('');
  const [feeRange, setFeeRange] = useState(10);
  const [minRating, setMinRating] = useState<number | null>(null);
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8 items-start">
        
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block bg-white border border-slate-200 rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" /> Filters
            </h2>
            <button className="text-blue-600 text-xs font-semibold hover:text-blue-700">
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            
            {/* Location */}
            <div>
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-slate-900">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> Location</div>
                <ChevronDown className="w-4 h-4 text-slate-400 rotate-180" />
              </div>
              <div className="space-y-2.5">
                {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'].map(loc => (
                  <label key={loc} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                    <span className="text-sm text-slate-600">{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* State */}
            <div>
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-slate-900">
                <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> State</div>
                <ChevronDown className="w-4 h-4 text-slate-400 rotate-180" />
              </div>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-500 outline-none">
                <option>Select State</option>
              </select>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Fee Range */}
            <div>
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-slate-900">
                <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg> Fee Range</div>
                <ChevronDown className="w-4 h-4 text-slate-400 rotate-180" />
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={feeRange}
                onChange={e => setFeeRange(Number(e.target.value))}
                className="w-full accent-blue-600 mb-4"
              />
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-[10px] text-slate-400 font-medium mb-1">Min ₹</div>
                  <input type="text" placeholder="Min" className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none" />
                </div>
                <div className="text-slate-300 mt-4">-</div>
                <div className="flex-1">
                  <div className="text-[10px] text-slate-400 font-medium mb-1">Max ₹</div>
                  <input type="text" placeholder="Max" className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none" />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Minimum Rating */}
            <div>
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-slate-900">
                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-blue-600" /> Minimum Rating</div>
                <ChevronDown className="w-4 h-4 text-slate-400 rotate-180" />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(r => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`flex-1 py-1.5 border rounded-lg flex items-center justify-center gap-1 text-xs font-semibold transition-colors ${
                      minRating === r ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r}<Star className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Course Type */}
            <div>
              <div className="flex items-center justify-between mb-3 text-sm font-bold text-slate-900">
                <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg> Course Type</div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>

          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Top <span className="text-blue-600">Colleges</span> This Season
            </h1>
            <p className="text-slate-500 text-sm mb-6">Explore top-ranked colleges with the best opportunities for your future.</p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus-within:border-blue-400 transition-all shadow-sm">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  className="bg-transparent border-none outline-none px-3 text-sm w-full text-slate-900"
                />
              </div>
              <button className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-700 shadow-sm transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm flex items-center gap-2 min-w-[160px] justify-between cursor-pointer">
                Rating (Highest) <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
              <div className="hidden lg:flex ml-auto items-center gap-1 text-sm text-blue-600 font-semibold cursor-pointer px-4 py-2 border border-slate-100 rounded-xl bg-white hover:bg-slate-50">
                View all colleges <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college, i) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="bg-white rounded-[1.25rem] border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col"
              >
                {/* Banner */}
                <div className="relative h-44">
                  <img src={college.bannerImage} alt={college.name} className="w-full h-full object-cover" />
                  
                  <button 
                    onClick={() => toggleSave(college.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${savedColleges.includes(college.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="absolute top-3 left-3 flex gap-2">
                    <div className="bg-white px-2 py-1 rounded-md text-xs font-bold text-slate-900 flex items-center shadow-sm">
                      <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500 mr-1" /> {college.rating}
                    </div>
                    <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                      NIRF #{college.nirfRanking}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  {/* Title & Location */}
                  <div className="mb-5">
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{college.shortName}</h3>
                    <div className="flex items-center text-slate-500 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {college.city}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">First Year Fee</div>
                      <div className="text-sm font-bold text-slate-900">₹{college.annualFees.toFixed(2)} L</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Highest Package</div>
                      <div className="text-sm font-bold text-emerald-500">₹{college.highestPackage.toFixed(1)} L</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Avg Package</div>
                      <div className="text-sm font-bold text-slate-900">₹{college.averagePackage.toFixed(1)} L</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                      {college.accreditation}
                    </div>
                    <Link href={`/colleges/${college.id}`} className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
