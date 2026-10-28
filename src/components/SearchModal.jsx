import React, { useState, useEffect, useRef } from 'react';
import { CHAPTERS } from '../data/bookData';
import { ALL_ACTIVITIES } from '../data/activitiesData';
import { 
  Search, 
  X, 
  BookOpen, 
  Terminal, 
  UserCheck, 
  Cpu, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  onSelectChapter,
  onNavigateTab
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectChapter(1);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Chapters
  const matchedChapters = q ? CHAPTERS.filter(ch => (
    ch.title.toLowerCase().includes(q) ||
    ch.subtitle.toLowerCase().includes(q) ||
    ch.highlights?.some(h => h.toLowerCase().includes(q)) ||
    ch.quote?.text.toLowerCase().includes(q) ||
    ch.quote?.author.toLowerCase().includes(q)
  )) : [];

  // Search Activities
  const matchedActivities = q ? Object.values(ALL_ACTIVITIES).filter(act => (
    act.title.toLowerCase().includes(q) ||
    act.description.toLowerCase().includes(q) ||
    act.badge.toLowerCase().includes(q)
  )) : [];

  const totalResults = matchedChapters.length + matchedActivities.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0F172A] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden z-10 flex flex-col max-h-[80vh] animate-fadeIn text-slate-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 9 Chapters, Elicitation Gambits, Mitnick Heists, Pretexts..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-800 rounded text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!query ? (
            <div className="p-6 text-center text-slate-500 space-y-2">
              <Terminal className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-xs">
                Type keywords like <span className="font-bold text-slate-300 font-mono">"Elicitation"</span>, <span className="font-bold text-slate-300 font-mono">"Mitnick"</span>, <span className="font-bold text-slate-300 font-mono">"Buffer Overflow"</span>, or <span className="font-bold text-slate-300 font-mono">"Cialdini"</span>.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs font-mono">
              No results found for "{query}".
            </div>
          ) : (
            <>
              {/* Chapters Results */}
              {matchedChapters.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1 font-mono">
                    Chapters ({matchedChapters.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedChapters.map(ch => (
                      <button
                        key={ch.id}
                        onClick={() => {
                          onSelectChapter(ch.id);
                          onNavigateTab('reader');
                          onClose();
                        }}
                        className="w-full p-3 rounded-2xl text-left border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                                CH {ch.id}
                              </span>
                              <span className="text-xs font-bold text-white group-hover:text-emerald-400">
                                {ch.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{ch.subtitle}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Activities Results */}
              {matchedActivities.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1 font-mono">
                    Interactive Exploits & Tools ({matchedActivities.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedActivities.map(act => (
                      <button
                        key={act.id}
                        onClick={() => {
                          onSelectChapter(act.chapterId);
                          onNavigateTab('reader');
                          onClose();
                        }}
                        className="w-full p-3 rounded-2xl text-left border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <Terminal className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-cyan-400 block font-mono">
                              {act.title}
                            </span>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{act.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
