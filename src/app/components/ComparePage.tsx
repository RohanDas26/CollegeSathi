import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, Star, MapPin, Award, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { colleges } from './data';
import { useApp } from './AppContext';

interface ComparePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function ComparePage({ onNavigate }: ComparePageProps) {
  const { compareList, toggleCompare } = useApp();
  const [addingSlot, setAddingSlot] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const compared = compareList.map(id => colleges.find(c => c.id === id)).filter(Boolean) as typeof colleges;
  const slots = Math.max(compared.length + (compared.length < 3 ? 1 : 0), 2);

  const rows = [
    { label: 'Type', key: (c: typeof colleges[0]) => c.type },
    { label: 'Location', key: (c: typeof colleges[0]) => c.city },
    { label: 'Established', key: (c: typeof colleges[0]) => c.established.toString() },
    { label: 'NIRF Rank', key: (c: typeof colleges[0]) => `#${c.nirfRanking}`, best: (vals: string[]) => vals.reduce((a, b) => Number(a.replace('#', '')) < Number(b.replace('#', '')) ? a : b) },
    { label: 'Rating', key: (c: typeof colleges[0]) => c.rating.toString(), best: (vals: string[]) => vals.reduce((a, b) => Number(a) > Number(b) ? a : b) },
    { label: 'Annual Fees', key: (c: typeof colleges[0]) => `₹${c.annualFees}L`, best: (vals: string[]) => vals.reduce((a, b) => Number(a.replace(/[₹L]/g, '')) < Number(b.replace(/[₹L]/g, '')) ? a : b) },
    { label: 'Placement %', key: (c: typeof colleges[0]) => `${c.placementPercentage}%`, best: (vals: string[]) => vals.reduce((a, b) => Number(a.replace('%', '')) > Number(b.replace('%', '')) ? a : b) },
    { label: 'Avg Package', key: (c: typeof colleges[0]) => `₹${c.averagePackage}L`, best: (vals: string[]) => vals.reduce((a, b) => Number(a.replace(/[₹L]/g, '')) > Number(b.replace(/[₹L]/g, '')) ? a : b) },
    { label: 'Highest Package', key: (c: typeof colleges[0]) => `₹${c.highestPackage}Cr`, best: (vals: string[]) => vals.reduce((a, b) => Number(a.replace(/[₹Cr]/g, '')) > Number(b.replace(/[₹Cr]/g, '')) ? a : b) },
    { label: 'Students', key: (c: typeof colleges[0]) => c.studentCount.toLocaleString() },
    { label: 'Faculty', key: (c: typeof colleges[0]) => c.facultyCount.toString() },
    { label: 'Accreditation', key: (c: typeof colleges[0]) => c.accreditation },
    { label: 'Campus Area', key: (c: typeof colleges[0]) => `${c.campusArea} acres`, best: (vals: string[]) => vals.reduce((a, b) => Number(a.replace(' acres', '')) > Number(b.replace(' acres', '')) ? a : b) },
  ];

  const filteredAdd = colleges
    .filter(c => !compareList.includes(c.id))
    .filter(c => c.shortName.toLowerCase().includes(searchQ.toLowerCase()) || c.name.toLowerCase().includes(searchQ.toLowerCase()));

  if (compared.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c0c14] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
            <Award className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-white mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>No Colleges to Compare</h2>
          <p className="text-white/40 mb-6" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            Browse colleges and click "Compare" to add them here. Compare up to 3 colleges side-by-side.
          </p>
          <button
            onClick={() => onNavigate('colleges')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white mx-auto transition-all"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Browse Colleges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c14]">
      {/* Header */}
      <div className="sticky top-14 z-30 border-b border-white/[0.06] bg-[#0c0c14]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => onNavigate('colleges')}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors"
            style={{ fontSize: '13px' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <h1 className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Compare Colleges</h1>
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400" style={{ fontSize: '11px' }}>
            {compared.length} of 3
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* College header cards */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${slots}, 1fr)` }}>
          {compared.map(college => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
            >
              <button
                onClick={() => toggleCompare(college.id)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/50 hover:text-white/80 transition-all z-10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="h-24 overflow-hidden">
                <img src={college.image} alt={college.name} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141420] to-transparent h-24" />
              </div>
              <div className="p-4 -mt-8 relative">
                <div
                  className="w-10 h-10 rounded-xl border border-white/[0.1] flex items-center justify-center mb-3 shadow-lg"
                  style={{ backgroundColor: college.logoColor + '22', color: college.logoColor, fontSize: '11px', fontWeight: 700 }}
                >
                  {college.logoInitials}
                </div>
                <div className="text-white mb-1" style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.3 }}>{college.shortName}</div>
                <div className="flex items-center gap-1 text-white/40 mb-2" style={{ fontSize: '11px' }}>
                  <MapPin className="w-3 h-3" />
                  {college.location}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white" style={{ fontSize: '12px', fontWeight: 500 }}>{college.rating}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-white ${
                    college.type === 'Government' ? 'bg-emerald-500/10 text-emerald-400' :
                    college.type === 'Deemed' ? 'bg-violet-500/10 text-violet-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`} style={{ fontSize: '10px' }}>
                    {college.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {compared.length < 3 && (
            <div className="relative">
              {addingSlot ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 h-full min-h-[200px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/60" style={{ fontSize: '13px' }}>Add college</span>
                    <button onClick={() => setAddingSlot(false)} className="text-white/30 hover:text-white/60">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    autoFocus
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    placeholder="Search college..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white placeholder-white/25 outline-none mb-2"
                    style={{ fontSize: '13px' }}
                  />
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {filteredAdd.slice(0, 8).map(c => (
                      <button
                        key={c.id}
                        onClick={() => { toggleCompare(c.id); setAddingSlot(false); setSearchQ(''); }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all text-left"
                        style={{ fontSize: '12px' }}
                      >
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: c.logoColor + '22', color: c.logoColor, fontSize: '8px', fontWeight: 700 }}>
                          {c.logoInitials}
                        </div>
                        {c.shortName}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setAddingSlot(true)}
                  className="w-full h-full min-h-[200px] rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.03] hover:border-indigo-500/30 transition-all group flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl border border-dashed border-white/[0.12] group-hover:border-indigo-500/40 flex items-center justify-center transition-all">
                    <Plus className="w-4 h-4 text-white/30 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <span className="text-white/30 group-hover:text-white/50 transition-colors" style={{ fontSize: '13px' }}>Add College</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: `200px repeat(${compared.length}, 1fr)` }}>
            {/* Header row */}
            <div className="py-3 px-4 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="text-white/35" style={{ fontSize: '12px' }}>Criteria</span>
            </div>
            {compared.map(c => (
              <div key={c.id} className="py-3 px-4 border-b border-l border-white/[0.06] bg-white/[0.02] text-center">
                <span className="text-white/70" style={{ fontSize: '12px', fontWeight: 500 }}>{c.shortName}</span>
              </div>
            ))}

            {/* Data rows */}
            {rows.map((row, ri) => {
              const vals = compared.map(c => row.key(c));
              const bestVal = row.best ? row.best(vals) : null;

              return [
                <div key={`label-${ri}`} className={`py-3.5 px-4 flex items-center border-b border-white/[0.04] ${ri % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                  <span className="text-white/40" style={{ fontSize: '12px' }}>{row.label}</span>
                </div>,
                ...compared.map((c, ci) => {
                  const val = vals[ci];
                  const isBest = bestVal !== null && val === bestVal;
                  return (
                    <div
                      key={`${c.id}-${ri}`}
                      className={`py-3.5 px-4 flex items-center justify-center border-b border-l border-white/[0.04] ${ri % 2 === 0 ? '' : 'bg-white/[0.01]'} ${isBest ? 'bg-indigo-500/[0.04]' : ''}`}
                    >
                      <span className={`${isBest ? 'text-indigo-300 font-semibold' : 'text-white/60'} flex items-center gap-1.5`} style={{ fontSize: '12px' }}>
                        {isBest && <CheckCircle2 className="w-3 h-3 text-indigo-400" />}
                        {val}
                      </span>
                    </div>
                  );
                }),
              ];
            }).flat()}
          </div>
        </div>

        {/* Courses comparison */}
        <div className="mt-6 rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="py-3 px-4 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="text-white/70" style={{ fontSize: '13px', fontWeight: 500 }}>Courses Offered</span>
          </div>
          <div className="grid p-4 gap-4" style={{ gridTemplateColumns: `repeat(${compared.length}, 1fr)` }}>
            {compared.map(c => (
              <div key={c.id}>
                <div className="text-white/40 mb-2" style={{ fontSize: '11px', fontWeight: 500 }}>{c.shortName}</div>
                <div className="flex flex-wrap gap-1">
                  {c.courses.slice(0, 4).map(course => (
                    <span key={course} className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50" style={{ fontSize: '11px' }}>
                      {course}
                    </span>
                  ))}
                  {c.courses.length > 4 && (
                    <span className="px-2 py-1 rounded-lg bg-indigo-500/[0.08] border border-indigo-500/15 text-indigo-400" style={{ fontSize: '11px' }}>
                      +{c.courses.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recruiters comparison */}
        <div className="mt-4 rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="py-3 px-4 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="text-white/70" style={{ fontSize: '13px', fontWeight: 500 }}>Top Recruiters</span>
          </div>
          <div className="grid p-4 gap-4" style={{ gridTemplateColumns: `repeat(${compared.length}, 1fr)` }}>
            {compared.map(c => (
              <div key={c.id}>
                <div className="text-white/40 mb-2" style={{ fontSize: '11px', fontWeight: 500 }}>{c.shortName}</div>
                <div className="flex flex-wrap gap-1">
                  {c.topRecruiters.slice(0, 5).map(r => (
                    <span key={r} className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50" style={{ fontSize: '11px' }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('colleges')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all mx-auto"
            style={{ fontSize: '13px' }}
          >
            <Plus className="w-4 h-4" />
            Add More Colleges to Compare
          </button>
        </div>
      </div>
    </div>
  );
}
