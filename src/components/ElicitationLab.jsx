import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert, 
  Copy, 
  Check, 
  Flame,
  Award,
  Zap
} from 'lucide-react';
import { ALL_ACTIVITIES } from '../data/activitiesData';

export default function ElicitationLab({ onCompleteActivity }) {
  const gambits = ALL_ACTIVITIES['ch3-elicitation-simulator'].gambits;
  const [activeId, setActiveId] = useState(gambits[0].id);
  const [customTopic, setCustomTopic] = useState('cloud backup providers');
  const [copied, setCopied] = useState(false);

  const cur = gambits.find(g => g.id === activeId) || gambits[0];

  const handleComplete = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    if (onCompleteActivity) onCompleteActivity('ch3-elicitation-simulator');
  };

  const copyGambit = () => {
    navigator.clipboard.writeText(cur.elicitationGambit);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8 text-slate-200">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-950 via-[#111A2E] to-emerald-950/70 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 font-mono uppercase tracking-wider">
              Chapter 3 Master Workbench
            </span>
            <span className="text-xs text-emerald-400 font-mono">Conversational Intel Extraction</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            The Elicitation Gambits Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Sun Tzu wrote: "The supreme art of war is to subdue the enemy without fighting." Master the subtle conversational techniques that compel targets to volunteer confidential data without ever feeling questioned.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Gambit Switcher */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold font-mono uppercase text-slate-400 px-1 block mb-2">
            Hadnagy's 4 Core Gambits
          </span>
          <div className="space-y-2">
            {gambits.map((g) => {
              const isSelected = g.id === activeId;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveId(g.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-xs font-bold text-white">{g.name}</span>
                    <Terminal className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{g.concept}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              onClick={handleComplete}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Mark Elicitation Mastered</span>
            </button>
          </div>
        </div>

        {/* Right Column: Tactical Breakdown & Live Simulator */}
        <div className="lg:col-span-8 bg-[#111827] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono block mb-1">
                Active Tactical Gambit
              </span>
              <h2 className="font-heading text-xl font-extrabold text-white">
                {cur.name}
              </h2>
            </div>
            <button
              onClick={copyGambit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-mono border border-slate-800 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Script'}</span>
            </button>
          </div>

          {/* Deep Psychological Mechanism */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono block">
              Cognitive Vulnerability Exploited:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {cur.concept}
            </p>
          </div>

          {/* Compare Direct Interrogation vs Gambit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono block">
                ❌ Amateur Mistake: Direct Interrogation
              </span>
              <p className="text-xs font-mono text-rose-200">
                {cur.badDirectAsk}
              </p>
              <p className="text-[11px] text-rose-400/80">
                Triggers defensive suspicion. Target immediately wonders why a stranger is asking for system specifications.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono block">
                ✅ Social Engineering Gambit
              </span>
              <p className="text-xs font-mono text-emerald-200 italic">
                "{cur.elicitationGambit}"
              </p>
              <p className="text-[11px] text-emerald-400/80">
                Disarms guard dogs. Target's ego or helpfulness takes over and volunteers the real answer.
              </p>
            </div>
          </div>

          {/* Target Response */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono block">
              Resulting Target Information Disclosure:
            </span>
            <p className="text-xs text-slate-300 italic font-mono">
              "{cur.targetResponse}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
