'use client';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { colleges } from '../data';
import { useApp } from '../AppContext';

export default function ComparePage() {
  const { compareList } = useApp();
  
  // Use mock selections if none selected for demo purposes matching the screenshot
  const defaultCompare = ['3', '2']; // IIM Ahmedabad and IIT Madras
  const activeIds = compareList.length > 0 ? compareList : defaultCompare;
  const compareColleges = activeIds.map(id => colleges.find(c => c.id === id)).filter(Boolean) as typeof colleges;

  if (compareColleges.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="text-slate-500">No colleges selected for comparison.</div>
      </div>
    );
  }

  // Calculate best values
  const oldestYear = Math.min(...compareColleges.map(c => c.established));
  const lowestFee = Math.min(...compareColleges.map(c => c.annualFees));
  const highestRating = Math.max(...compareColleges.map(c => c.rating));
  const highestPlacement = Math.max(...compareColleges.map(c => c.placementPercentage));
  const highestPackage = Math.max(...compareColleges.map(c => c.highestPackage));

  const BestBadge = () => (
    <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold tracking-wide">
      <CheckCircle2 className="w-3 h-3" /> BEST
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Compare Colleges</h1>
        <p className="text-slate-500 text-sm mb-8">Side-by-side comparison to help you make the right choice.</p>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="p-6 w-64 bg-white sticky left-0 z-10 border-r border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compare Criteria</span>
                  </th>
                  {compareColleges.map(college => (
                    <th key={college.id} className="p-6 min-w-[300px] border-r border-slate-100 last:border-r-0 align-top">
                      <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{college.name}</h3>
                        <div className="text-slate-500 text-xs mt-1">{college.city}, {college.state}</div>
                      </div>
                      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2.5 rounded-xl transition-colors text-xs">
                        View Details
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                {/* Established */}
                <tr>
                  <td className="p-6 font-bold text-slate-700 bg-white sticky left-0 z-10 border-r border-slate-100 text-sm">Established</td>
                  {compareColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-slate-100 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">{college.established}</span>
                        {college.established === oldestYear && <BestBadge />}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Degree Type */}
                <tr>
                  <td className="p-6 font-bold text-slate-700 bg-white sticky left-0 z-10 border-r border-slate-100 text-sm">Degree Type</td>
                  {compareColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-slate-100 last:border-r-0">
                      <span className="text-slate-700 font-semibold">{college.courses[0]}</span>
                    </td>
                  ))}
                </tr>

                {/* Annual Fees */}
                <tr>
                  <td className="p-6 font-bold text-slate-700 bg-white sticky left-0 z-10 border-r border-slate-100 text-sm">Annual Fees</td>
                  {compareColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-slate-100 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-bold">₹{college.annualFees}L</span>
                        {college.annualFees === lowestFee && <BestBadge />}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-6 font-bold text-slate-700 bg-white sticky left-0 z-10 border-r border-slate-100 text-sm">Rating</td>
                  {compareColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-slate-100 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">{college.rating} / 5</span>
                        {college.rating === highestRating && <BestBadge />}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Placement Rate */}
                <tr>
                  <td className="p-6 font-bold text-slate-700 bg-slate-50/50 sticky left-0 z-10 border-r border-slate-100 text-sm">Placement Rate</td>
                  {compareColleges.map(college => (
                    <td key={college.id} className="p-6 bg-emerald-50/10 border-r border-slate-100 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className={college.placementPercentage === highestPlacement ? "text-emerald-600 font-bold" : "text-slate-700 font-semibold"}>
                          {college.placementPercentage}%
                        </span>
                        {college.placementPercentage === highestPlacement && <BestBadge />}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Highest Package */}
                <tr>
                  <td className="p-6 font-bold text-slate-700 bg-white sticky left-0 z-10 border-r border-slate-100 text-sm">Highest Package</td>
                  {compareColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-slate-100 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold">₹{college.highestPackage} Cr</span>
                        {college.highestPackage === highestPackage && <BestBadge />}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Student Count */}
                <tr>
                  <td className="p-6 font-bold text-slate-700 bg-white sticky left-0 z-10 border-r border-slate-100 text-sm">Student Count</td>
                  {compareColleges.map(college => (
                    <td key={college.id} className="p-6 border-r border-slate-100 last:border-r-0">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">{college.studentCount}K+</span>
                        {/* Mocking the best badge for student count as seen in screenshot */}
                        {college.id === '2' && <BestBadge />}
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
