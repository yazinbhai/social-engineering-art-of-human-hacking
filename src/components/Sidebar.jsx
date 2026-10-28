import React, { useState } from 'react';
import { CHAPTERS, PARTS } from '../data/bookData';
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Terminal, 
  Clock, 
  BookOpen, 
  ShieldAlert,
  Flame
} from 'lucide-react';

export default function Sidebar({
  activeChapterId,
  setActiveChapterId,
  completedActivities = [],
  onCloseMobile
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedParts, setCollapsedParts] = useState({});

  const togglePart = (partId) => {
    setCollapsedParts(prev => ({
      ...prev,
      [partId]: !prev[partId]
    }));
  };

  const filteredChapters = CHAPTERS.filter(ch => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      ch.title.toLowerCase().includes(query) ||
      ch.subtitle.toLowerCase().includes(query) ||
      ch.highlights?.some(h => h.toLowerCase().includes(query))
    );
  });

  const handleSelect = (id) => {
    setActiveChapterId(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="h-full flex flex-col bg-[#0B0F19] border-r border-slate-800 select-none">
      {/* Top Search Filter */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/60">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter 9 Chapters..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-mono"
          />
        </div>
      </div>

      {/* Chapters Tree List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {PARTS.map((part) => {
          const partChapters = filteredChapters.filter(ch => ch.partId === part.id);
          if (partChapters.length === 0) return null;
          const isCollapsed = collapsedParts[part.id];

          return (
            <div key={part.id} className="space-y-1.5">
              {/* Part Section Header */}
              <button
                onClick={() => togglePart(part.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="font-heading truncate">{part.title}</span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                )}
              </button>

              {/* Chapters in this Part */}
              {!isCollapsed && (
                <div className="space-y-1 pl-1">
                  {partChapters.map((ch) => {
                    const isActive = ch.id === activeChapterId;
                    const activityKey = `ch${ch.id}-`;
                    const isCompleted = completedActivities.some(actId => actId.startsWith(activityKey) || actId === ch.content?.find(c => c.type === 'activity-ref')?.activityId);

                    return (
                      <button
                        key={ch.id}
                        onClick={() => handleSelect(ch.id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all duration-150 cursor-pointer flex items-start gap-2.5 ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900 text-white border border-emerald-500/50 shadow-md font-semibold'
                            : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        {/* Status Icon */}
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                          )}
                        </div>

                        {/* Chapter Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                              isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                            }`}>
                              CH {ch.id}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono truncate">{ch.pages}</span>
                          </div>
                          
                          <div className={`font-heading text-xs font-semibold leading-tight line-clamp-1 ${
                            isActive ? 'text-white' : 'text-slate-300'
                          }`}>
                            {ch.title.replace(/^Chapter \d+:\s*/, '')}
                          </div>

                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {ch.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Information Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center justify-between font-medium">
          <span className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>9 Human Hacking Exploits</span>
          </span>
          <span className="font-mono text-slate-400">474 Pages</span>
        </div>
      </div>
    </aside>
  );
}
