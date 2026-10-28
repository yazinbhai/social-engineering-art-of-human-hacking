import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Flame, 
  AlertTriangle, 
  Copy, 
  Check, 
  Lightbulb,
  Search,
  Users,
  Eye,
  KeyRound
} from 'lucide-react';

export default function ActivityRenderer({
  activity,
  onComplete,
  isCompleted = false
}) {
  if (!activity) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#10B981', '#06B6D4', '#F59E0B', '#EF4444']
    });
    if (onComplete) onComplete(activity.id);
  };

  return (
    <div className="card-cyber overflow-hidden border border-slate-800 bg-[#0E1424] my-8 shadow-xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#111A2E] to-emerald-950/60 p-4 sm:p-5 border-b border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 font-mono">
              {activity.badge || 'Exploit Simulator'}
            </span>
            <span className="text-xs text-slate-400 font-mono">Chapter {activity.chapterId}</span>
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>{activity.title}</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl">
            {activity.description}
          </p>
        </div>

        {/* Completion Status Pill */}
        <div className="shrink-0 flex items-center">
          {isCompleted ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Exploit Mastered</span>
            </div>
          ) : (
            <button
              onClick={triggerCelebration}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer font-mono"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Mark Mastered</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Body */}
      <div className="p-4 sm:p-6 bg-slate-950/40">
        {activity.type === 'se-mindset-audit' && (
          <MindsetAuditActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'osint-footprint-lab' && (
          <OsintFootprintActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'elicitation-simulator' && (
          <ElicitationSimulatorActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'pretext-architect' && (
          <PretextArchitectActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'human-buffer-overflow-lab' && (
          <HumanBufferOverflowActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'influence-weapons-lab' && (
          <InfluenceWeaponsActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'se-toolkit-explorer' && (
          <SeToolkitActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'case-study-dissector' && (
          <CaseStudyDissectorActivity activity={activity} onAction={triggerCelebration} />
        )}
        {activity.type === 'defense-auditor' && (
          <DefenseAuditorActivity activity={activity} onAction={triggerCelebration} />
        )}

        {/* Debrief Callout */}
        {activity.debrief && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-200 leading-relaxed">
              <span className="font-bold text-emerald-300 font-mono block mb-0.5">Hadnagy Security Debrief:</span>
              {activity.debrief}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 1. Mindset Audit Component
function MindsetAuditActivity({ activity, onAction }) {
  const [checked, setChecked] = useState({});

  const toggle = (id) => {
    const updated = { ...checked, [id]: !checked[id] };
    setChecked(updated);
    if (Object.values(updated).filter(Boolean).length === activity.vectors.length) {
      onAction();
    }
  };

  const riskScore = activity.vectors.reduce((acc, v) => acc + (checked[v.id] ? v.weight : 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-white block">Human Vulnerability Index</span>
          <span className="text-[11px] text-slate-400">Check the items that occur within your team or workplace:</span>
        </div>
        <div className={`text-xl font-heading font-extrabold font-mono ${riskScore >= 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
          {riskScore}/100 Risk Score
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {activity.vectors.map(item => {
          const isSelected = !!checked[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`p-3.5 rounded-xl text-left border flex items-start gap-3 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-rose-950/30 border-rose-500/50 text-white'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                isSelected ? 'bg-rose-500 border-rose-500 text-slate-950 font-bold' : 'border-slate-700 bg-slate-950'
              }`}>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono block mb-0.5">
                  {item.label} (+{item.weight}% Risk)
                </span>
                <span className="text-xs leading-relaxed text-slate-300">{item.question}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 2. OSINT Footprint Lab
function OsintFootprintActivity({ activity }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const cur = activity.intelSources[activeIdx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activity.intelSources.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
              activeIdx === idx
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {s.source}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Raw Finding */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Intercepted OSINT Artifact</span>
          </span>
          <div className="text-xs font-mono text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800">
            {cur.finding}
          </div>
        </div>

        {/* Intelligence Gained */}
        <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Actionable Attack Surface Unlocked</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {cur.intelGained}
          </p>
        </div>
      </div>
    </div>
  );
}

// 3. Elicitation Simulator
function ElicitationSimulatorActivity({ activity }) {
  const [activeId, setActiveId] = useState(activity.gambits[0].id);
  const cur = activity.gambits.find(g => g.id === activeId) || activity.gambits[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activity.gambits.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveId(g.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-mono ${
              activeId === g.id
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-bold text-white">{cur.name}</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Psychological Mechanism
          </span>
        </div>
        <p className="text-xs text-slate-400">{cur.concept}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {/* Direct Ask */}
          <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono block">
              ❌ Amateur Direct Question (Sparks Alarms)
            </span>
            <p className="text-xs text-rose-200 font-mono">{cur.badDirectAsk}</p>
          </div>

          {/* Social Engineering Gambit */}
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono block">
              ✅ Elicitation Gambit (Non-Threatening)
            </span>
            <p className="text-xs text-emerald-200 italic font-mono">"{cur.elicitationGambit}"</p>
          </div>
        </div>

        {/* Target Response */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono block">
            Target's Subconscious Volunteer Response:
          </span>
          <p className="text-xs text-slate-300 italic">"{cur.targetResponse}"</p>
        </div>
      </div>
    </div>
  );
}

// 4. Pretext Architect
function PretextArchitectActivity({ activity }) {
  const [selected, setSelected] = useState(activity.pretexts[0]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activity.pretexts.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-mono ${
              selected.id === p.id
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {p.role}
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-bold text-white">{selected.role}</span>
          <span className="text-[10px] font-mono text-slate-400">Context: {selected.context}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-bold text-amber-400 block mb-1 font-mono">Wardrobe & Attire:</span>
            <p className="text-slate-300">{selected.wardrobe}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-bold text-cyan-400 block mb-1 font-mono">Key Physical Props:</span>
            <ul className="list-disc list-inside text-slate-300 space-y-0.5">
              {selected.props.map((pr, i) => <li key={i}>{pr}</li>)}
            </ul>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          <span className="font-bold text-emerald-400 block mb-1 font-mono">Emergency Fallback / Escape Plan:</span>
          <p className="text-slate-300 italic">"{selected.escapePlan}"</p>
        </div>
      </div>
    </div>
  );
}

// 5. Human Buffer Overflow
function HumanBufferOverflowActivity({ activity, onAction }) {
  const [activeStimuli, setActiveStimuli] = useState({});

  const toggle = (id) => {
    setActiveStimuli(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const count = Object.values(activeStimuli).filter(Boolean).length;
  const isCrashed = count >= 3;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-white block">Cognitive Load Meter</span>
          <span className="text-[11px] text-slate-400">Add simultaneous stimuli to stress-test target working memory:</span>
        </div>
        <div className={`text-sm font-bold font-mono px-3 py-1 rounded-full ${
          isCrashed ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' : 'bg-slate-800 text-slate-300'
        }`}>
          {isCrashed ? 'CRITICAL: SYSTEM 2 CRASHED!' : `Load: ${count * 25}%`}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {activity.stimuli.map(st => {
          const on = !!activeStimuli[st.id];
          return (
            <button
              key={st.id}
              onClick={() => toggle(st.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                on ? 'bg-rose-950/40 border-rose-500/50 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <span className="text-xs font-bold font-mono block mb-1">{st.name}</span>
              <p className="text-[11px] text-slate-300">{st.desc}</p>
            </button>
          );
        })}
      </div>

      {isCrashed && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 animate-fadeIn space-y-1">
          <strong className="font-mono text-rose-300 block">System 1 Exploit Triggered:</strong>
          The target's prefrontal cortex is paralyzed by simultaneous audio, physical, and authority overload. The security guard swipes the door release automatically just to clear the distraction.
        </div>
      )}
    </div>
  );
}

// 6. Influence Weapons
function InfluenceWeaponsActivity({ activity }) {
  const [activeWeapon, setActiveWeapon] = useState(activity.weapons[0]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activity.weapons.map((w, idx) => (
          <button
            key={idx}
            onClick={() => setActiveWeapon(w)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-mono ${
              activeWeapon.name === w.name
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {w.name}
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-bold text-white">{activeWeapon.name}</span>
          <span className="text-[10px] font-mono text-emerald-400">Biological Trigger</span>
        </div>
        <p className="text-xs text-slate-400">{activeWeapon.trigger}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1">
            <span className="font-bold text-rose-400 font-mono block">Social Engineering Attack:</span>
            <p className="text-slate-300">{activeWeapon.seAttack}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
            <span className="font-bold text-emerald-400 font-mono block">Cognitive Defense Shield:</span>
            <p className="text-slate-300">{activeWeapon.defenseShield}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. SE Toolkit Explorer
function SeToolkitActivity({ activity }) {
  const [selectedTool, setSelectedTool] = useState(activity.tools[0]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {activity.tools.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTool(t)}
            className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer font-mono ${
              selectedTool.name === t.name
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            <span className="text-[9px] text-slate-500 block">{t.category}</span>
            <span className="truncate block">{t.name}</span>
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
        <div>
          <span className="text-sm font-bold text-white block mb-0.5">{selectedTool.name}</span>
          <span className="text-[10px] font-mono text-emerald-400">{selectedTool.category}</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <span className="font-bold text-amber-400 font-mono block">Attacker Deployment:</span>
          <p className="text-slate-300">{selectedTool.use}</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
          <span className="font-bold text-emerald-400 font-mono block">Physical & Cryptographic Countermeasure:</span>
          <p className="text-slate-300">{selectedTool.countermeasure}</p>
        </div>
      </div>
    </div>
  );
}

// 8. Case Study Dissector
function CaseStudyDissectorActivity({ activity }) {
  const [activeCase, setActiveCase] = useState(activity.cases[0]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activity.cases.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCase(c)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer font-mono ${
              activeCase.id === c.id
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c.title.split(':')[0]}
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
        <div>
          <span className="text-sm font-bold text-white block mb-0.5">{activeCase.title}</span>
          <div className="flex gap-2 text-[10px] text-slate-400 font-mono">
            <span>Target: {activeCase.target}</span>
            <span>•</span>
            <span className="text-amber-400">Vector: {activeCase.vector}</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <span className="font-bold text-cyan-400 font-mono block">Tactical Sequence of the Breach:</span>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            {activeCase.breakdown.map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
          <span className="font-bold text-emerald-400 font-mono block mb-0.5">Critical Defense Lesson:</span>
          <p className="text-slate-300">{activeCase.defenseLesson}</p>
        </div>
      </div>
    </div>
  );
}

// 9. Defense Auditor
function DefenseAuditorActivity({ activity }) {
  const [selected, setSelected] = useState(activity.scripts[0]);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(selected.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activity.scripts.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer font-mono ${
              selected.scenario === s.scenario
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400'
            }`}
          >
            Scenario #{idx + 1}
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
        <div>
          <span className="font-bold text-white block mb-0.5">{selected.scenario}</span>
          <span className="text-[10px] font-mono text-emerald-400">Mandatory Policy: {selected.policy}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-400 font-mono text-[10px]">Verbatim Employee Defense Script:</span>
            <button
              onClick={copy}
              className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-mono cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Script'}</span>
            </button>
          </div>
          <p className="text-slate-200 italic leading-relaxed font-mono">
            "{selected.script}"
          </p>
        </div>
      </div>
    </div>
  );
}
