import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserCheck, 
  Sparkles, 
  Briefcase, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers,
  KeyRound,
  Eye
} from 'lucide-react';
import { ALL_ACTIVITIES } from '../data/activitiesData';

export default function PretextStudio({ onCompleteActivity }) {
  const pretexts = ALL_ACTIVITIES['ch4-pretext-architect'].pretexts;
  const [selectedId, setSelectedId] = useState(pretexts[0].id);
  const [targetOrg, setTargetOrg] = useState('Acme Financial Corp');
  const [copied, setCopied] = useState(false);

  const cur = pretexts.find(p => p.id === selectedId) || pretexts[0];

  const handleComplete = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    if (onCompleteActivity) onCompleteActivity('ch4-pretext-architect');
  };

  const copyDossier = () => {
    const dossier = `PRETEXT DOSSIER\\nTarget: ${targetOrg}\\nRole: ${cur.role}\\nContext: ${cur.context}\\nWardrobe: ${cur.wardrobe}\\nProps: ${cur.props.join(', ')}\\nJargon: ${cur.jargon.join(', ')}\\nEscape Plan: ${cur.escapePlan}`;
    navigator.clipboard.writeText(dossier);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8 text-slate-200">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-950 via-[#111A2E] to-cyan-950/70 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-400 text-slate-950 font-mono uppercase tracking-wider">
              Chapter 4 Persona Engine
            </span>
            <span className="text-xs text-cyan-300 font-mono">Plausible Identity Architecture</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            The Pretexting Persona Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Richard Jeni observed: "Honesty is the key to a relationship. If you can fake that, you're in." Architect believable undercover personas, align nonverbal props, and craft escape plans.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Personas */}
        <div className="lg:col-span-4 space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1 font-mono uppercase">
              Target Organization:
            </label>
            <input
              type="text"
              value={targetOrg}
              onChange={(e) => setTargetOrg(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <span className="text-xs font-bold font-mono uppercase text-slate-400 px-1 block pt-2">
            Field-Tested Personas
          </span>
          <div className="space-y-2">
            {pretexts.map((p) => {
              const isSelected = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-xs font-bold text-white">{p.role}</span>
                    <UserCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{p.context}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={handleComplete}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Save Pretext to Mastered</span>
            </button>
          </div>
        </div>

        {/* Right Column: Pretext Blueprint */}
        <div className="lg:col-span-8 bg-[#111827] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono block mb-1">
                Active Cover Persona
              </span>
              <h2 className="font-heading text-xl font-extrabold text-white">
                {cur.role}
              </h2>
              <span className="text-xs text-slate-400 font-mono">Mission: {cur.context} at {targetOrg}</span>
            </div>
            <button
              onClick={copyDossier}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-mono border border-slate-800 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Dossier'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Wardrobe */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 font-mono block uppercase text-[10px]">
                👔 Attire & Visual Anchors:
              </span>
              <p className="text-slate-300 leading-relaxed">{cur.wardrobe}</p>
            </div>

            {/* Props */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 font-mono block uppercase text-[10px]">
                🧰 Physical Props & Artifacts:
              </span>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                {cur.props.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>

          {/* Jargon */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 font-mono block uppercase text-[10px]">
              🗣️ Credibility Vocabulary & Specialized Jargon:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {cur.jargon.map((j, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]">
                  "{j}"
                </span>
              ))}
            </div>
          </div>

          {/* Emergency Fallback Exit */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1 text-xs">
            <span className="font-bold text-rose-400 font-mono block uppercase text-[10px]">
              🚨 Emergency Bailout Response (If Challenged by Guards/Staff):
            </span>
            <p className="text-rose-200 italic font-mono">
              "{cur.escapePlan}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
