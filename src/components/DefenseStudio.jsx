import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  AlertTriangle, 
  Flame, 
  CheckCircle2,
  Lock,
  FileText
} from 'lucide-react';
import { ALL_ACTIVITIES } from '../data/activitiesData';

export default function DefenseStudio({ onCompleteActivity }) {
  const cases = ALL_ACTIVITIES['ch8-case-study-dissector'].cases;
  const scripts = ALL_ACTIVITIES['ch9-defense-auditor'].scripts;

  const [activeCase, setActiveCase] = useState(cases[0]);
  const [activeScript, setActiveScript] = useState(scripts[0]);
  const [copied, setCopied] = useState(false);

  const handleComplete = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    if (onCompleteActivity) {
      onCompleteActivity('ch8-case-study-dissector');
      onCompleteActivity('ch9-defense-auditor');
    }
  };

  const copyScript = () => {
    navigator.clipboard.writeText(activeScript.script);
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
              Chapters 8 & 9 Defense Center
            </span>
            <span className="text-xs text-emerald-400 font-mono">Real-World Case Dissection & Human Firewalls</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            Case Studies Dissector & Active Defense
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Mati Aharoni noted: "The best security is through education." Analyze how legendary penetrations succeeded and arm frontline staff with rehearsed out-of-band verification scripts.
          </p>
        </div>
      </div>

      {/* Part 1: Case Studies Dissector */}
      <div className="bg-[#111827] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono block mb-1">
              Historic Attack Deconstruction
            </span>
            <h2 className="font-heading text-xl font-bold text-white">
              Legendary Penetration Audits
            </h2>
          </div>
          <div className="flex gap-2">
            {cases.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCase(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                  activeCase.id === c.id
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {c.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div>
              <h3 className="font-heading text-base font-bold text-white">{activeCase.title}</h3>
              <span className="text-[11px] text-slate-400 font-mono">Target: {activeCase.target}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px]">
              Vector: {activeCase.vector}
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-cyan-400 font-mono uppercase text-[10px] block">
              Step-by-Step Breach Progression:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeCase.breakdown.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <span className="font-bold text-emerald-400 font-mono block mb-1">Institutional Defense Takeaway:</span>
            <p className="text-slate-300 leading-relaxed">{activeCase.defenseLesson}</p>
          </div>
        </div>
      </div>

      {/* Part 2: Active Defense & Verification Scripts */}
      <div className="bg-[#111827] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono block mb-1">
              Frontline Defense Arsenal
            </span>
            <h2 className="font-heading text-xl font-bold text-white">
              Employee Policy Verification Scripts
            </h2>
          </div>
          <button
            onClick={copyScript}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-mono border border-slate-800 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Script'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {scripts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScript(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                activeScript.scenario === s.scenario
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              Scenario #{idx + 1}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div>
            <span className="text-sm font-bold text-white block mb-0.5">{activeScript.scenario}</span>
            <span className="text-[10px] font-mono text-emerald-400">Mandatory Rule: {activeScript.policy}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono leading-relaxed italic">
            "{activeScript.script}"
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer font-mono"
        >
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>Save Defense Protocols to Mastered</span>
        </button>
      </div>
    </div>
  );
}
