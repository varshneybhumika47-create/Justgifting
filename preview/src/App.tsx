import React, { useState } from 'react';
import Page3 from '../../Page 3/page';
import Page4 from '../../Page 4/page';
import Page5 from '../../Page 5/page';
import { Gift, LayoutDashboard, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'page3' | 'page4' | 'page5'>('page3');

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-stone-900/90 text-white backdrop-blur-md border-b border-stone-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <span className="font-bold text-lg tracking-tight text-white">JustGifting</span>
                <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verification Active
                </span>
              </div>
            </div>

            {/* Page Switcher Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 bg-stone-800/80 p-1.5 rounded-xl border border-stone-700/60">
              <button
                id="tab-page-3"
                onClick={() => setCurrentPage('page3')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  currentPage === 'page3'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
                }`}
              >
                <Gift className="h-4 w-4" />
                <span>Page 3: Recommendations</span>
              </button>

              <button
                id="tab-page-4"
                onClick={() => setCurrentPage('page4')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  currentPage === 'page4'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Page 4: Dashboard</span>
              </button>

              <button
                id="tab-page-5"
                onClick={() => setCurrentPage('page5')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  currentPage === 'page5'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/50'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>Page 5: Public Page</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area rendering the active page */}
      <div className="flex-1">
        {currentPage === 'page3' && (
          <div id="page3-container" className="animate-in fade-in duration-200">
            <Page3 />
          </div>
        )}
        {currentPage === 'page4' && (
          <div id="page4-container" className="animate-in fade-in duration-200">
            <Page4 />
          </div>
        )}
        {currentPage === 'page5' && (
          <div id="page5-container" className="animate-in fade-in duration-200">
            <Page5 />
          </div>
        )}
      </div>
    </div>
  );
}
