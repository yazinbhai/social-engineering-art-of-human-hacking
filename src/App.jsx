import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChapterReader from './components/ChapterReader';
import ElicitationLab from './components/ElicitationLab';
import PretextStudio from './components/PretextStudio';
import BufferOverflowStudio from './components/BufferOverflowStudio';
import DefenseStudio from './components/DefenseStudio';
import SearchModal from './components/SearchModal';
import { ALL_ACTIVITIES } from './data/activitiesData';
import { CHAPTERS, BOOK_METADATA } from './data/bookData';
import { Terminal, Menu, X, BookOpen, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('reader');
  const [activeChapterId, setActiveChapterId] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Persistent completed activities in localStorage
  const [completedActivities, setCompletedActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('se_human_hacking_completed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('se_human_hacking_completed', JSON.stringify(completedActivities));
    } catch (e) {}
  }, [completedActivities]);

  const totalActivities = Object.keys(ALL_ACTIVITIES).length;

  const handleCompleteActivity = (activityId) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities(prev => [...prev, activityId]);
    }
  };

  const handleNavigateTab = (tab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-[#10B981] selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigateTab}
        completedActivities={completedActivities}
        totalActivities={totalActivities}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tab 1: Ebook Reader */}
        {currentTab === 'reader' && (
          <div className="flex-1 flex relative">
            {/* Desktop Left Sidebar */}
            <div className="hidden lg:block w-80 shrink-0 border-r border-slate-800 h-[calc(100vh-5rem)] sticky top-20">
              <Sidebar
                activeChapterId={activeChapterId}
                setActiveChapterId={setActiveChapterId}
                completedActivities={completedActivities}
              />
            </div>

            {/* Mobile Sidebar Overlay Drawer */}
            {isSidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex animate-fadeIn">
                <div 
                  className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <div className="relative w-80 max-w-[85vw] bg-[#0B0F19] h-full shadow-2xl z-10 flex flex-col border-r border-slate-800">
                  <div className="p-3.5 bg-slate-900 flex justify-between items-center border-b border-slate-800">
                    <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>9 Chapters Navigation</span>
                    </span>
                    <button 
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <Sidebar
                      activeChapterId={activeChapterId}
                      setActiveChapterId={setActiveChapterId}
                      completedActivities={completedActivities}
                      onCloseMobile={() => setIsSidebarOpen(false)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Main Reading Center */}
            <main className="flex-1 overflow-y-auto min-w-0">
              {/* Mobile Sidebar Toggle Header */}
              <div className="lg:hidden px-4 py-3 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-800 cursor-pointer font-mono"
                >
                  <Menu className="w-4 h-4 text-emerald-400" />
                  <span>Chapter {activeChapterId} of 9</span>
                </button>
                <span className="text-[11px] text-slate-400 font-mono">
                  {completedActivities.length}/{totalActivities} Mastered
                </span>
              </div>

              <ChapterReader
                chapterId={activeChapterId}
                onSelectChapter={setActiveChapterId}
                completedActivities={completedActivities}
                onCompleteActivity={handleCompleteActivity}
                onNavigateToTab={handleNavigateTab}
              />
            </main>
          </div>
        )}

        {/* Tab 2: Elicitation Lab */}
        {currentTab === 'elicitation' && (
          <main className="flex-1 overflow-y-auto">
            <ElicitationLab
              onCompleteActivity={handleCompleteActivity}
            />
          </main>
        )}

        {/* Tab 3: Pretexting Studio */}
        {currentTab === 'pretexting' && (
          <main className="flex-1 overflow-y-auto">
            <PretextStudio
              onCompleteActivity={handleCompleteActivity}
            />
          </main>
        )}

        {/* Tab 4: Buffer Overflow Studio */}
        {currentTab === 'overflow' && (
          <main className="flex-1 overflow-y-auto">
            <BufferOverflowStudio
              onCompleteActivity={handleCompleteActivity}
            />
          </main>
        )}

        {/* Tab 5: Defense & Cases */}
        {currentTab === 'defense' && (
          <main className="flex-1 overflow-y-auto">
            <DefenseStudio
              onCompleteActivity={handleCompleteActivity}
            />
          </main>
        )}
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChapter={setActiveChapterId}
        onNavigateTab={handleNavigateTab}
      />

      {/* Global Footer */}
      <footer className="bg-[#0B0F19] border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-auto shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-heading font-bold text-white text-sm flex items-center justify-center md:justify-start gap-2">
              <span className="text-emerald-400">{BOOK_METADATA.title}: {BOOK_METADATA.subtitle}</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-xs text-slate-300">Interactive Master Edition</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Based on the work of {BOOK_METADATA.author} ({BOOK_METADATA.authorRole}) • Foreword by {BOOK_METADATA.foreword} • {BOOK_METADATA.publisher}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
            <button onClick={() => handleNavigateTab('reader')} className="hover:text-emerald-400 transition-colors cursor-pointer">Reader</button>
            <button onClick={() => handleNavigateTab('elicitation')} className="hover:text-emerald-400 transition-colors cursor-pointer">Elicitation</button>
            <button onClick={() => handleNavigateTab('pretexting')} className="hover:text-emerald-400 transition-colors cursor-pointer">Pretexting</button>
            <button onClick={() => handleNavigateTab('overflow')} className="hover:text-emerald-400 transition-colors cursor-pointer">Buffer Overflow</button>
            <button onClick={() => handleNavigateTab('defense')} className="hover:text-emerald-400 transition-colors cursor-pointer">Defense & Cases</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
