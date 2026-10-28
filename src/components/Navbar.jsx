import React from 'react';
import { 
  BookOpen, 
  Terminal, 
  UserCheck, 
  Cpu, 
  ShieldCheck, 
  Search, 
  Award, 
  Flame, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookData';

export default function Navbar({
  currentTab,
  setCurrentTab,
  completedActivities = [],
  totalActivities = 9,
  onOpenSearch
}) {
  const percentComplete = Math.round((completedActivities.length / Math.max(totalActivities, 1)) * 100);

  const navItems = [
    { id: 'reader', label: 'Ebook Reader', icon: BookOpen, badge: '9 Chapters' },
    { id: 'elicitation', label: 'Elicitation Lab', icon: Terminal, badge: 'Gambits' },
    { id: 'pretexting', label: 'Pretexting Studio', icon: UserCheck, badge: 'Personas' },
    { id: 'overflow', label: 'Buffer Overflow', icon: Cpu, badge: 'Psych' },
    { id: 'defense', label: 'Defense & Cases', icon: ShieldCheck, badge: 'Mitnick' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setCurrentTab('reader')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  SOCIAL ENGINEERING
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Human Hacking Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
                Christopher Hadnagy • Foreword by Kevin Mitnick • Wiley
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area: Search + Mastery Progress */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              title="Search book, techniques, and case studies (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 rounded border border-slate-750 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mastery Progress Badge */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 sm:py-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl shadow-xs border border-slate-700/60">
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1 font-mono">
                  <span>Exploit Labs</span>
                  <span className="text-white">({percentComplete}%)</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-300">
                  {completedActivities.length} / {totalActivities} Mastered
                </div>
              </div>
              <div className="sm:hidden text-xs font-bold text-emerald-400 font-mono">
                {completedActivities.length}/{totalActivities}
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2.5 border-t border-slate-800 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
