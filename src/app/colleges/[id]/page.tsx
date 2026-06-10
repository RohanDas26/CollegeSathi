'use client';
import { notFound } from 'next/navigation';
import { colleges } from '../../data';
import { MapPin, Star, Trophy, Heart, BarChart2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../AppContext';
import { useState, use } from 'react';

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { savedColleges, toggleSave, compareList, toggleCompare } = useApp();
  const resolvedParams = use(params);
  const college = colleges.find(c => c.id === resolvedParams.id);
  const [activeTab, setActiveTab] = useState('Overview');

  if (!college) {
    notFound();
  }

  const isSaved = savedColleges.includes(college.id);
  const isCompared = compareList.includes(college.id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Hero Section */}
      <div className="relative h-[380px] bg-slate-900">
        <img 
          src={college.bannerImage} 
          alt={college.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="absolute bottom-0 w-full px-4 sm:px-6 pb-20 max-w-7xl mx-auto left-0 right-0">
          <div className="flex gap-3 mb-4">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">{college.type}</span>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">{college.accreditation}</span>
            <span className="border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md bg-white/10">Est. {college.established}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{college.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-200">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {college.city}, {college.state}</div>
            <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-orange-500 fill-orange-500" /> <span className="text-white font-bold">{college.rating}</span> / 5.0</div>
            <div className="flex items-center gap-1.5 bg-blue-600/20 px-2 py-0.5 rounded text-blue-200 border border-blue-500/30">
              <Trophy className="w-3.5 h-3.5" /> #{college.nirfRanking} NIRF
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Left Content Column */}
        <div className="flex-1 space-y-8">
          
          {/* Overview Stats Card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
              <div className="p-4 rounded-2xl bg-slate-50">
                <div className="text-2xl font-black text-slate-900 mb-1">₹{college.annualFees}L</div>
                <div className="text-xs text-slate-500 font-medium">Annual Fees</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50">
                <div className="text-2xl font-black text-emerald-500 mb-1">{college.placementPercentage}%</div>
                <div className="text-xs text-slate-500 font-medium">Placement Rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50">
                <div className="text-2xl font-black text-slate-900 mb-1">₹{college.averagePackage}L</div>
                <div className="text-xs text-slate-500 font-medium">Avg Package</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50">
                <div className="text-2xl font-black text-slate-900 mb-1">{college.studentCount}</div>
                <div className="text-xs text-slate-500 font-medium">Students</div>
              </div>
            </div>
            
            <div className="flex border-t border-slate-100 px-4">
              {['Overview', 'Courses', 'Placement', 'Reviews', 'Gallery'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab ? 'border-slate-900 text-slate-900 bg-slate-900 text-white rounded-t-xl mt-[-1px]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              About {college.city}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {college.description} Established in {college.established}, it is recognized for its academic excellence, cutting-edge research, and innovation.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The campus features state-of-the-art facilities, modern laboratories, advanced computing centers, and a thriving student community. With a sprawling campus spread across {college.campusArea} acres, students enjoy a vibrant campus life that balances rigorous academics with rich extracurricular activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Key Highlights */}
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Key Highlights</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" /> <span className="font-medium text-slate-700">#{college.nirfRanking} NIRF Ranking</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" /> <span className="font-medium text-slate-700">{college.placementPercentage}% Placement Rate</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" /> <span className="font-medium text-slate-700">QS World Rank 118</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" /> <span className="font-medium text-slate-700">₹{(college.highestPackage / 100).toFixed(1)}Cr Highest Package</span>
                </div>
              </div>
            </div>

            {/* Top Specializations */}
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Top Specializations</h2>
              <div className="flex flex-wrap gap-3">
                {college.specializations.map(spec => (
                  <span key={spec} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm rounded-xl">
                    {spec}
                  </span>
                ))}
                {/* Mocking extra specializations to match screenshot density */}
                {college.specializations.length < 5 && (
                  <>
                    <span className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm rounded-xl">Data Science</span>
                    <span className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm rounded-xl">VLSI Design</span>
                    <span className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm rounded-xl">Quantum Computing</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Courses & Fees */}
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>
              Courses & Fees
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-4 font-bold text-slate-900">Course</th>
                    <th className="py-4 font-bold text-slate-900">Duration</th>
                    <th className="py-4 font-bold text-slate-900 text-right">1st Year Fees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {college.courses.map((course, idx) => (
                    <tr key={idx}>
                      <td className="py-5 font-bold text-slate-700">{course} in Computer Science</td>
                      <td className="py-5 text-slate-500 font-medium">4 Years</td>
                      <td className="py-5 text-right font-bold text-emerald-600">₹{college.annualFees.toFixed(2)} L</td>
                    </tr>
                  ))}
                  {/* Additional mock rows if courses are too few */}
                  {college.courses.length < 3 && (
                    <>
                      <tr>
                        <td className="py-5 font-bold text-slate-700">{college.courses[0] || 'MBA'} in Electrical</td>
                        <td className="py-5 text-slate-500 font-medium">4 Years</td>
                        <td className="py-5 text-right font-bold text-emerald-600">₹{college.annualFees.toFixed(2)} L</td>
                      </tr>
                      <tr>
                        <td className="py-5 font-bold text-slate-700">{college.courses[0] || 'MBA'} in Mechanical</td>
                        <td className="py-5 text-slate-500 font-medium">4 Years</td>
                        <td className="py-5 text-right font-bold text-emerald-600">₹{college.annualFees.toFixed(2)} L</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Campus Gallery */}
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Campus Gallery
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <img src={college.image} alt="Campus 1" className="w-full h-48 object-cover rounded-2xl" />
              <img src={college.bannerImage} alt="Campus 2" className="w-full h-48 object-cover rounded-2xl" />
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 sticky top-24 shadow-sm">
            
            <h3 className="font-bold text-slate-900 text-lg mb-6">Quick Actions</h3>
            <div className="space-y-3 mb-10">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md shadow-blue-600/20 text-sm">
                Apply Now
              </button>
              <button 
                onClick={() => toggleSave(college.id)}
                className={`w-full border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm ${isSaved ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} /> Save to Wishlist
              </button>
              <button 
                onClick={() => toggleCompare(college.id)}
                className={`w-full border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm ${isCompared ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
              >
                <BarChart2 className="w-4 h-4" /> {isCompared ? 'Remove Compare' : 'Add to Compare'}
              </button>
            </div>

            <div className="mb-10">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5">Key Stats Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600"><Trophy className="w-4 h-4 text-blue-600" /> NIRF Rank</div>
                  <div className="font-bold text-slate-900">#{college.nirfRanking}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600"><MapPin className="w-4 h-4 text-emerald-600" /> Campus</div>
                  <div className="font-bold text-slate-900">{college.campusArea} acres</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600"><svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Top Package</div>
                  <div className="font-bold text-slate-900">₹{(college.highestPackage / 100).toFixed(1)} Cr</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-5">Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {college.topRecruiters.map(company => (
                  <span key={company} className="px-3 py-1.5 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 bg-slate-50">
                    {company}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
