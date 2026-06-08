import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Star, Heart, BarChart3, ExternalLink, Award, Users,
  BookOpen, Building2, CheckCircle2, ArrowLeft, TrendingUp,
  DollarSign, GraduationCap, Camera, MessageSquare
} from 'lucide-react';
import { colleges, type College } from './data';
import { useApp } from './AppContext';

interface CollegeDetailPageProps {
  collegeId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Building2 },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'fees', label: 'Fees', icon: DollarSign },
  { id: 'placements', label: 'Placements', icon: TrendingUp },
  { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  { id: 'facilities', label: 'Facilities', icon: CheckCircle2 },
  { id: 'gallery', label: 'Gallery', icon: Camera },
];

export function CollegeDetailPage({ collegeId, onNavigate }: CollegeDetailPageProps) {
  const college = colleges.find(c => c.id === collegeId);
  const { savedColleges, compareList, toggleSave, toggleCompare } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!college) {
    return (
      <div className="min-h-screen bg-[#0c0c14] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white/40 mb-4" style={{ fontSize: '16px' }}>College not found</div>
          <button onClick={() => onNavigate('colleges')} className="text-indigo-400 hover:text-indigo-300" style={{ fontSize: '14px' }}>
            ← Back to colleges
          </button>
        </div>
      </div>
    );
  }

  const isSaved = savedColleges.includes(college.id);
  const isComparing = compareList.includes(college.id);

  return (
    <div className="min-h-screen bg-[#0c0c14]">
      {/* Hero Banner */}
      <div className="relative h-[280px] overflow-hidden">
        <img src={college.bannerImage} alt={college.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-[#0c0c14]/60 to-[#0c0c14]/20" />

        {/* Back button */}
        <div className="absolute top-4 left-4 sm:left-6">
          <button
            onClick={() => onNavigate('colleges')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white/70 hover:text-white backdrop-blur-sm transition-all"
            style={{ fontSize: '13px' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* College header */}
        <div className="-mt-16 relative z-10 flex flex-col lg:flex-row lg:items-end gap-5 pb-6 border-b border-white/[0.06]">
          <div className="flex items-end gap-4 flex-1">
            <div
              className="w-20 h-20 rounded-2xl border-2 border-white/[0.08] flex items-center justify-center shrink-0 shadow-xl"
              style={{ backgroundColor: college.logoColor + '22', color: college.logoColor, fontSize: '16px', fontWeight: 800, background: `linear-gradient(135deg, ${college.logoColor}22, ${college.logoColor}11)` }}
            >
              {college.logoInitials}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full border text-xs ${
                  college.type === 'Government' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                  college.type === 'Deemed' ? 'border-violet-500/30 bg-violet-500/10 text-violet-400' :
                  'border-blue-500/30 bg-blue-500/10 text-blue-400'
                }`}>
                  {college.type}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs">
                  {college.accreditation}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-white/50 text-xs">
                  Est. {college.established}
                </span>
              </div>
              <h1 className="text-white mb-1" style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                {college.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-white/50" style={{ fontSize: '13px' }}>
                  <MapPin className="w-3.5 h-3.5" />
                  {college.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-white" style={{ fontSize: '13px', fontWeight: 600 }}>{college.rating}</span>
                  <span className="text-white/35" style={{ fontSize: '12px' }}>({college.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-indigo-400" style={{ fontSize: '13px', fontWeight: 600 }}>
                  <Award className="w-3.5 h-3.5" />
                  #{college.nirfRanking} NIRF
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => toggleSave(college.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-150 ${
                isSaved
                  ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                  : 'border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:border-white/[0.15]'
              }`}
              style={{ fontSize: '13px' }}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => toggleCompare(college.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-150 ${
                isComparing
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
                  : 'border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:border-white/[0.15]'
              }`}
              style={{ fontSize: '13px' }}
            >
              <BarChart3 className="w-4 h-4" />
              {isComparing ? 'Comparing' : 'Compare'}
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150"
              style={{ fontSize: '13px', fontWeight: 500 }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Apply Now
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/[0.06]">
          {[
            { label: 'Annual Fees', value: `₹${college.annualFees}L`, sub: 'per year', color: 'text-white' },
            { label: 'Placement Rate', value: `${college.placementPercentage}%`, sub: `Avg ₹${college.averagePackage}L`, color: 'text-emerald-400' },
            { label: 'Avg Package', value: `₹${college.averagePackage}L`, sub: `Highest ₹${college.highestPackage}Cr`, color: 'text-white' },
            { label: 'Students', value: college.studentCount.toLocaleString(), sub: `${college.facultyCount} Faculty`, color: 'text-white' },
          ].map(stat => (
            <div key={stat.label} className="px-4 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className={stat.color} style={{ fontSize: '20px', fontWeight: 700 }}>{stat.value}</div>
              <div className="text-white/50" style={{ fontSize: '12px', fontWeight: 500 }}>{stat.label}</div>
              <div className="text-white/25" style={{ fontSize: '11px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 py-4 border-b border-white/[0.06] overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeTab === tab.id ? 'text-white bg-white/[0.07]' : 'text-white/40 hover:text-white/65 hover:bg-white/[0.04]'
              }`}
              style={{ fontSize: '13px' }}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6 py-6 pb-12">
          {/* Tab Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {activeTab === 'overview' && <OverviewTab college={college} />}
                {activeTab === 'courses' && <CoursesTab college={college} />}
                {activeTab === 'fees' && <FeesTab college={college} />}
                {activeTab === 'placements' && <PlacementsTab college={college} />}
                {activeTab === 'reviews' && <ReviewsTab college={college} />}
                {activeTab === 'facilities' && <FacilitiesTab college={college} />}
                {activeTab === 'gallery' && <GalleryTab college={college} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Action Panel */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white mb-4" style={{ fontSize: '15px', fontWeight: 600 }}>Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Apply Now
                  </button>
                  <button
                    onClick={() => toggleSave(college.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-150 ${
                      isSaved ? 'border-rose-500/30 bg-rose-500/10 text-rose-400' : 'border-white/[0.08] text-white/60 hover:text-white'
                    }`}
                    style={{ fontSize: '14px' }}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
                    {isSaved ? 'Saved to wishlist' : 'Save to wishlist'}
                  </button>
                  <button
                    onClick={() => toggleCompare(college.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-150 ${
                      isComparing ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400' : 'border-white/[0.08] text-white/60 hover:text-white'
                    }`}
                    style={{ fontSize: '14px' }}
                  >
                    <BarChart3 className="w-4 h-4" />
                    {isComparing ? 'Added to compare' : 'Add to compare'}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white mb-3" style={{ fontSize: '14px', fontWeight: 600 }}>Key Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: 'NIRF Ranking', value: `#${college.nirfRanking}` },
                    { label: 'Campus Area', value: `${college.campusArea} acres` },
                    { label: 'Highest Package', value: `₹${college.highestPackage} Cr` },
                    { label: 'Accreditation', value: college.accreditation },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-white/40" style={{ fontSize: '12px' }}>{item.label}</span>
                      <span className="text-white" style={{ fontSize: '12px', fontWeight: 500 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h3 className="text-white mb-3" style={{ fontSize: '14px', fontWeight: 600 }}>Top Recruiters</h3>
                <div className="flex flex-wrap gap-1.5">
                  {college.topRecruiters.slice(0, 6).map(r => (
                    <span key={r} className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50" style={{ fontSize: '11px' }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-white mb-4" style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.01em' }}>{children}</h2>;
}

function OverviewTab({ college }: { college: College }) {
  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>About {college.shortName}</SectionTitle>
        <p className="text-white/55 leading-relaxed" style={{ fontSize: '14px', lineHeight: '1.75' }}>
          {college.description}
        </p>
      </div>

      <div>
        <SectionTitle>Highlights</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {college.highlights.map(h => (
            <div key={h} className="flex items-center gap-2 p-3 rounded-xl border border-indigo-500/15 bg-indigo-500/[0.06]">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-white/70" style={{ fontSize: '12px' }}>{h}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Specializations</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {college.specializations.map(s => (
            <span key={s} className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/55" style={{ fontSize: '13px' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Users, label: 'Total Students', value: college.studentCount.toLocaleString() },
          { icon: GraduationCap, label: 'Faculty Members', value: college.facultyCount.toString() },
          { icon: Building2, label: 'Campus Area', value: `${college.campusArea} acres` },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <item.icon className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>{item.value}</div>
              <div className="text-white/35" style={{ fontSize: '11px' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesTab({ college }: { college: College }) {
  return (
    <div className="space-y-5">
      <SectionTitle>Degree Programs</SectionTitle>
      <div className="flex flex-wrap gap-2 mb-5">
        {college.degreeTypes.map(dt => (
          <span key={dt} className="px-3.5 py-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.08] text-indigo-300" style={{ fontSize: '13px', fontWeight: 500 }}>
            {dt}
          </span>
        ))}
      </div>

      <SectionTitle>Courses Offered</SectionTitle>
      <div className="space-y-2">
        {college.courses.map((course, i) => (
          <motion.div
            key={course}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-white/80" style={{ fontSize: '14px' }}>{course}</span>
            </div>
            <div className="flex items-center gap-2">
              {college.degreeTypes.slice(0, 2).map(dt => (
                <span key={dt} className="px-2 py-0.5 rounded bg-white/[0.04] text-white/30 border border-white/[0.06]" style={{ fontSize: '10px' }}>
                  {dt}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FeesTab({ college }: { college: College }) {
  const feeRows = college.degreeTypes.map((dt, i) => ({
    degree: dt,
    annual: college.annualFees * (0.8 + i * 0.1),
    total: college.annualFees * (0.8 + i * 0.1) * (dt === 'PhD' ? 3 : dt.includes('M') ? 2 : 4),
  }));

  return (
    <div className="space-y-5">
      <SectionTitle>Fee Structure</SectionTitle>
      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {['Program', 'Annual Fees', 'Total Fees', 'Scholarship'].map(h => (
                <th key={h} className="px-4 py-3 text-white/40 text-left" style={{ fontSize: '12px', fontWeight: 500 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feeRows.map((row, i) => (
              <tr key={row.degree} className={`border-b border-white/[0.04] ${i % 2 === 0 ? '' : 'bg-white/[0.01]'} hover:bg-white/[0.03] transition-colors`}>
                <td className="px-4 py-3.5">
                  <span className="text-white" style={{ fontSize: '13px', fontWeight: 500 }}>{row.degree}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-white/70" style={{ fontSize: '13px' }}>₹{row.annual.toFixed(1)}L / year</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-white/70" style={{ fontSize: '13px' }}>₹{row.total.toFixed(1)}L total</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400" style={{ fontSize: '11px' }}>Available</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.05]">
        <div className="flex items-start gap-2">
          <Award className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-amber-300 mb-1" style={{ fontSize: '13px', fontWeight: 500 }}>Scholarship Available</div>
            <div className="text-white/45" style={{ fontSize: '12px', lineHeight: '1.6' }}>
              Merit-based scholarships are available for top-ranking students. Government scholarships and SC/ST/OBC fee waivers also apply. Check the official website for current scholarship programs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlacementsTab({ college }: { college: College }) {
  return (
    <div className="space-y-5">
      <SectionTitle>Placement Statistics</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Placement Rate', value: `${college.placementPercentage}%`, color: 'text-emerald-400' },
          { label: 'Average Package', value: `₹${college.averagePackage} LPA`, color: 'text-white' },
          { label: 'Highest Package', value: `₹${college.highestPackage} Cr`, color: 'text-indigo-400' },
          { label: 'Companies Visited', value: '150+', color: 'text-white' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
            <div className={s.color} style={{ fontSize: '20px', fontWeight: 700 }}>{s.value}</div>
            <div className="text-white/40" style={{ fontSize: '11px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <SectionTitle>Top Recruiters</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {college.topRecruiters.map(r => (
          <div key={r} className="flex items-center gap-2 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50 shrink-0" style={{ fontSize: '9px', fontWeight: 700 }}>
              {r.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-white/65 truncate" style={{ fontSize: '12px' }}>{r}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SectionTitle>Package Distribution</SectionTitle>
        <div className="space-y-2">
          {[
            { range: '> 20 LPA', pct: 35, color: 'bg-indigo-500' },
            { range: '10–20 LPA', pct: 40, color: 'bg-indigo-400' },
            { range: '5–10 LPA', pct: 18, color: 'bg-indigo-300' },
            { range: '< 5 LPA', pct: 7, color: 'bg-indigo-200' },
          ].map(row => (
            <div key={row.range} className="flex items-center gap-3">
              <span className="text-white/40 w-20 shrink-0" style={{ fontSize: '12px' }}>{row.range}</span>
              <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full rounded-full ${row.color}`}
                />
              </div>
              <span className="text-white/40 w-8 text-right shrink-0" style={{ fontSize: '12px' }}>{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ college }: { college: College }) {
  const reviews = college.reviews.length > 0 ? college.reviews : [
    { id: 'mock1', author: 'Aditya Kumar', avatar: 'AK', rating: 4, date: 'May 2024', content: 'Great faculty and excellent infrastructure. The placement opportunities are outstanding and the alumni network is strong.', program: 'B.Tech CS', batch: '2024' },
    { id: 'mock2', author: 'Sneha Reddy', avatar: 'SR', rating: 5, date: 'April 2024', content: 'Best decision of my academic career. Research labs are world class and professors are highly qualified and approachable.', program: 'M.Tech', batch: '2023' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <SectionTitle>Student Reviews</SectionTitle>
        <button className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/15 transition-all" style={{ fontSize: '13px' }}>
          Write a Review
        </button>
      </div>

      <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-4">
        <div className="text-center">
          <div className="text-white" style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1 }}>{college.rating}</div>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(college.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/15'}`} />
            ))}
          </div>
          <div className="text-white/35 mt-1" style={{ fontSize: '12px' }}>{college.reviewCount.toLocaleString()} reviews</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-white/30 w-3 text-right" style={{ fontSize: '11px' }}>{star}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : 3}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map(review => (
          <div key={review.id} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400" style={{ fontSize: '11px', fontWeight: 600 }}>
                  {review.avatar}
                </div>
                <div>
                  <div className="text-white" style={{ fontSize: '13px', fontWeight: 500 }}>{review.author}</div>
                  <div className="text-white/35" style={{ fontSize: '11px' }}>{review.program} · Batch {review.batch}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/15'}`} />
                  ))}
                </div>
                <span className="text-white/25" style={{ fontSize: '11px' }}>{review.date}</span>
              </div>
            </div>
            <p className="text-white/55" style={{ fontSize: '13px', lineHeight: '1.65' }}>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilitiesTab({ college }: { college: College }) {
  return (
    <div className="space-y-5">
      <SectionTitle>Campus Facilities</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {college.facilities.map(f => (
          <div key={f} className="flex items-center gap-2.5 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white/65" style={{ fontSize: '13px' }}>{f}</span>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] mt-4">
        <h3 className="text-white mb-3" style={{ fontSize: '14px', fontWeight: 600 }}>Campus Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Campus Size', value: `${college.campusArea} acres` },
            { label: 'Established', value: college.established.toString() },
            { label: 'Hostel Capacity', value: '5,000+ beds' },
            { label: 'Labs', value: '100+ labs' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <span className="text-white/35" style={{ fontSize: '12px' }}>{item.label}</span>
              <span className="text-white/70" style={{ fontSize: '12px', fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryTab({ college }: { college: College }) {
  const images = [college.image, college.bannerImage, college.image, college.bannerImage, college.image, college.bannerImage];
  return (
    <div>
      <SectionTitle>Campus Gallery</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.02 }}
            className={`rounded-xl overflow-hidden border border-white/[0.06] cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" style={{ height: i === 0 ? '280px' : '130px' }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
