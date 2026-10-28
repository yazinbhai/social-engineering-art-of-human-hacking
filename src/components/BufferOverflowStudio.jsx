import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  Flame, 
  CheckCircle2, 
  RotateCcw,
  Sliders,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { ALL_ACTIVITIES } from '../data/activitiesData';

export default function BufferOverflowStudio({ onCompleteActivity }) {
  const stimuliList = ALL_ACTIVITIES['ch5-human-buffer-overflow-lab'].stimuli;
  const [activeStimuli, setActiveStimuli] = useState({
    urgency: true,
    physical_load: true
  });

  const toggle = (id) => {
    setActiveStimuli(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCount = Object.values(activeStimuli).filter(Boolean).length;
  const loadPercent = Math.min(activeCount * 25 + 10, 100);
  const isCrashed = loadPercent >= 75;

  const handleComplete = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    if (onCompleteActivity) onCompleteActivity('ch5-human-buffer-overflow-lab');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8 text-slate-200">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-950 via-[#111A2E] to-rose-950/70 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white font-mono uppercase tracking-wider">
              Chapter 5 Psychological Exploit
            </span>
            <span className="text-xs text-rose-300 font-mono">Cognitive Memory Exhaustion</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            The Human Buffer Overflow Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Carl Jung wrote: "It all depends on how we look at things, and not on how they are themselves." Explore how cognitive overload, time compression, and simultaneous sensory inputs crash the target's analytical System 2 reasoning.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Stimuli Controls */}
        <div className="lg:col-span-5 bg-[#111827] rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-rose-400" />
              <span>Sensory Inputs Injection</span>
            </h2>
            <button
              onClick={() => setActiveStimuli({ urgency: false, physical_load: false })}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>

          <div className="space-y-3">
            {stimuliList.map(st => {
              const isOn = !!activeStimuli[st.id];
              return (
                <button
                  key={st.id}
                  onClick={() => toggle(st.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    isOn
                      ? 'bg-rose-950/30 border-rose-500 ring-2 ring-rose-500/20 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading text-xs font-bold text-white font-mono">{st.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isOn ? 'bg-rose-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isOn ? '+25% Load' : 'OFF'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{st.desc}</p>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleComplete}
            className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer font-mono"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Buffer Overflow Mastered</span>
          </button>
        </div>

        {/* Right: Cognitive Load Gauge & Exploit Result */}
        <div className="lg:col-span-7 space-y-5">
          {/* Working Memory Load Gauge */}
          <div className="bg-[#111827] rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Target Prefrontal Cortex Working Memory
                </span>
                <span className="font-heading text-lg font-bold text-white">
                  George Miller's 7 ± 2 Chunk Capacity
                </span>
              </div>
              <div className={`text-2xl font-mono font-extrabold ${
                isCrashed ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
              }`}>
                {loadPercent}% LOAD
              </div>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  isCrashed ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-500'
                }`}
                style={{ width: `${loadPercent}%` }}
              />
            </div>

            {/* Status Callout */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isCrashed 
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' 
                : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
            }`}>
              <strong className="font-mono block mb-1">
                {isCrashed ? '⚠️ BUFFER OVERFLOW DETECTED: SYSTEM 2 HAS CRASHED' : '✅ System 2 Verification Still Active'}
              </strong>
              {isCrashed ? (
                <span>
                  The target's conscious analytical filter is overwhelmed by conflicting sensory, emotional, and time stimuli. To clear the cognitive bottleneck, the brain drops its security protocols and defaults to the simplest physical compliance action (swiping you in or handing over the requested badge).
                </span>
              ) : (
                <span>
                  The target currently retains enough working memory capacity to execute formal security checks, verify guest identification, and question discrepancies.
                </span>
              )}
            </div>
          </div>

          {/* NLP Pacing & Leading Primer */}
          <div className="bg-[#111827] rounded-3xl border border-slate-800 p-6 space-y-3 shadow-xl text-xs">
            <span className="font-heading font-bold text-sm text-cyan-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>NLP Pacing and Leading in Human Hacking</span>
            </span>
            <p className="text-slate-300 leading-relaxed">
              Before triggering an emotional buffer overflow, an attacker establishes rapport through <strong>pacing</strong> (matching the target's speech rate, breathing rhythm, and posture). Once the target's subconscious feels in harmony, the attacker <strong>leads</strong> them by escalating urgency and stress, making the target follow into the compliance trap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
