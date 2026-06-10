'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Search, ChevronRight, BarChart3, Video, MessageSquare } from 'lucide-react';
import { Footer } from './components/Footer';

const typeWriterWords = [
  'that Fits',
  'in Your City',
  'for Your Future',
  'on your Budget'
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'College' | 'Location' | 'Course'>('College');
  
  // Typewriter effect
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typeWriterWords[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % typeWriterWords.length);
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 fill-blue-600" /> Smart college matching for 2025-26
          </div>
          
          <h1 className="text-[3.5rem] leading-[1.1] font-bold text-slate-900 mb-6 tracking-tight">
            Discover the Right <br />
            College <br />
            <span className="text-blue-600">{text}<span className="animate-pulse">|</span></span>
          </h1>

          <p className="text-slate-500 text-lg mb-8 max-w-xl">
            Search, compare, and apply to the best colleges in India. Make data-driven decisions with real student reviews and placement data.
          </p>

          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mb-6">
            <div className="flex items-center gap-2 mb-3 px-2 pt-2">
              {(['College', 'Location', 'Course'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all">
              <div className="pl-4">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="text"
                placeholder="Search for IIT, NIT, BITS, VIT..."
                className="flex-1 px-3 py-3.5 outline-none text-slate-900 placeholder:text-slate-400"
              />
              <div className="pr-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm">
                  Search <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Popular:</span>
            {['Computer Science Engineering', 'IIT Colleges Delhi', 'Top Engineering Bangalore', 'Government Colleges Maharashtra'].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 font-medium hover:border-slate-300 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side - Predictor Card */}
        <div className="w-full max-w-[440px]">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold mb-6 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Verified Data
            </div>
            
            <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
              Turn Your <span className="text-blue-600">Score into</span><br />
              College Opportunities
            </h3>
            
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Predict your admission chances across colleges based on exam performance, category, and preferences.
            </p>

            <button className="w-full bg-[#1e293b] hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-between px-6 transition-colors mb-6">
              Explore Predictors <ChevronRight className="w-4 h-4" />
            </button>

            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
              <div>
                <div className="text-xs font-bold text-slate-600 mb-0.5">Cutoff Trend</div>
                <div className="text-[10px] text-slate-400">Last 3 years</div>
              </div>
              <div className="flex items-end gap-1 h-6">
                <div className="w-1.5 h-3 bg-blue-300 rounded-full" />
                <div className="w-1.5 h-4 bg-blue-400 rounded-full" />
                <div className="w-1.5 h-5 bg-blue-500 rounded-full" />
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Notifications */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <h2 className="font-bold text-slate-900 text-lg">Latest News & Notifications</h2>
          </div>
          
          <div className="flex-1 flex gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {[
              { t: 'NTA extends ICAR AIEEA PG 2026 deadline', d: 'June 8, 2026, 10:25 AM IST' },
              { t: 'Over 1.86 lakh candidates appear for IAT 2026', d: 'June 8, 2026, 10:25 AM IST' },
              { t: 'TS POLYCET 2026 seat allotment result out', d: 'June 8, 2026, 10:25 AM IST' },
              { t: 'UP police constable exam 2026 begins today', d: 'June 8, 2026, 10:25 AM IST' }
            ].map((news, i) => (
              <div key={i} className="flex items-start gap-3 shrink-0 w-72 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0 object-cover overflow-hidden" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug mb-1 line-clamp-2">{news.t}</h4>
                  <div className="text-[10px] text-slate-400">{news.d}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="text-blue-600 text-sm font-semibold shrink-0 hover:text-blue-700">View All</button>
        </div>
      </section>

      {/* Data That Drives Decisions */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] font-bold text-slate-900 mb-4">Data That Drives Decisions</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We simplify information for you on over 40,422 Colleges, 669 Exams, and 354,930 Courses across domains and regions all over India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Rankings & Exams */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-600"><BarChart3 className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-slate-900">Rankings</h3>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                1500 Colleges Ranked based on transparent, accurate, government-approved, student-friendly data.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Top Engineering Colleges in India', 'Top MBA Colleges in India', 'Top Law Colleges in India', 'Top Medical Colleges in India', 'Top Universities in India'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-slate-300 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-600"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                <h3 className="text-xl font-bold text-slate-900">Exams</h3>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Easy Information and downloads on Exam preparation, dates, counselling, syllabus and more.
              </p>
              <div className="flex flex-wrap gap-2">
                {['JEE Main', 'GATE', 'CAT', 'CLAT', 'NEET', 'BITSAT', 'SRMJEEE', 'NIFT Entrance Exam', 'VITEEE', 'MET', 'CUET', 'LPU NEST'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-slate-300 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Predictor Tool */}
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <div className="w-8 h-8 rounded-full border-4 border-blue-600 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">College Predictor Tool</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-sm">
              Input your predicted or actual exam scores to see a curated list of colleges where you have the highest chance of admission.
            </p>
            <button className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
              Launch Predictor Tool
            </button>
          </div>

        </div>
      </section>

      {/* Expert Counselling & Community */}
      <section className="bg-slate-50 py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] font-bold text-slate-900 mb-4">Expert Counselling & Community</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We ease your biggest doubts with personalized Video Counselling from our Curated Experts and Answers from the student community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Expert Counselling</h3>
            </div>
            <p className="text-slate-500 text-sm mb-10 flex-1">
              Get personalized guidance from expert counsellors - choose your stream to get started.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-emerald-600 font-bold text-xs uppercase tracking-wide flex items-center gap-1 hover:text-emerald-700">
                ENGINEERING UG <ChevronRight className="w-4 h-4" />
              </button>
              <button className="text-emerald-600 font-bold text-xs uppercase tracking-wide flex items-center gap-1 hover:text-emerald-700">
                MEDICINE UG <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">QnA Community</h3>
            </div>
            <p className="text-slate-500 text-sm mb-10 flex-1">
              1 Million+ Questions answered by the student community within 24 hours each.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-emerald-600 font-bold text-xs uppercase tracking-wide flex items-center gap-1 hover:text-emerald-700">
                ASK NOW <ChevronRight className="w-4 h-4" />
              </button>
              <button className="text-emerald-600 font-bold text-xs uppercase tracking-wide flex items-center gap-1 hover:text-emerald-700">
                QNA <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
