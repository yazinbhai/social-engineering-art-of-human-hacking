import React from 'react';
import { CHAPTERS, BOOK_METADATA } from '../data/bookData';
import { ALL_ACTIVITIES } from '../data/activitiesData';
import ActivityRenderer from './ActivityRenderer';
import { 
  BookOpen, 
  Clock, 
  Terminal, 
  Flame, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  FlaskConical, 
  AlertTriangle, 
  ShieldCheck, 
  Quote,
  ExternalLink,
  FileText
} from 'lucide-react';

function renderTextWithLinks(text) {
  if (!text || typeof text !== 'string') return text;

  // Regex matches URLs starting with http://, https://, www., or social-engineer.org
  const urlRegex = /((?:https?:\/\/|www\.|(?:[a-zA-Z0-9-]+\.)*social-engineer\.org)[^\s"\'<>\(\)\[\]]*)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    const rawUrl = match[0];
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      let prefix = text.substring(lastIndex, matchIndex);
      // Remove any opening bracket immediately preceding the URL
      prefix = prefix.replace(/([(\[{<])\s*$/, '');
      if (prefix) {
        parts.push(prefix);
      }
    }

    // Separate trailing punctuation attached to URLs (. , ; : ! ? ) ] } >)
    let cleanUrl = rawUrl;
    let trailingPunct = '';
    const punctMatch = cleanUrl.match(/([.,;:!?\)\]\}\>]+)$/);
    if (punctMatch) {
      trailingPunct = punctMatch[1];
      cleanUrl = cleanUrl.substring(0, cleanUrl.length - trailingPunct.length);
    }
    // Remove closing brackets from trailing punctuation so they don't render after the link
    trailingPunct = trailingPunct.replace(/[)\]}>]/g, '');

    const href = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')
      ? cleanUrl
      : `http://${cleanUrl}`;

    parts.push(
      <span key={`link-block-${matchIndex}`} className="block my-2.5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-400 font-mono text-xs sm:text-sm font-semibold transition-all break-all px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-500/70 shadow-xs hover:bg-emerald-900/60"
          onClick={(e) => e.stopPropagation()}
          title={`Visit external link: ${cleanUrl}`}
        >
          <span>{cleanUrl}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80" />
        </a>
      </span>
    );

    if (trailingPunct) {
      parts.push(trailingPunct);
    }

    lastIndex = matchIndex + rawUrl.length;
    // If the next character immediately after lastIndex is a closing bracket, skip it
    if (lastIndex < text.length && /^[)\]}>]/.test(text.substring(lastIndex))) {
      lastIndex += 1;
    }
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ChapterReader({
  chapterId,
  onSelectChapter,
  completedActivities = [],
  onCompleteActivity,
  onNavigateToTab
}) {
  const chapter = CHAPTERS.find(c => c.id === chapterId) || CHAPTERS[0];
  const nextChapter = CHAPTERS.find(c => c.id === chapter.id + 1);
  const prevChapter = CHAPTERS.find(c => c.id === chapter.id - 1);

  const getCalloutStyles = (iconType) => {
    switch (iconType) {
      case 'hacker':
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-500/40',
          title: 'text-emerald-300',
          iconColor: 'text-emerald-400',
          Icon: Terminal
        };
      case 'warstory':
        return {
          bg: 'bg-amber-950/30',
          border: 'border-amber-500/40',
          title: 'text-amber-300',
          iconColor: 'text-amber-400',
          Icon: Flame
        };
      case 'warning':
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-500/40',
          title: 'text-rose-300',
          iconColor: 'text-rose-400',
          Icon: AlertTriangle
        };
      case 'science':
        return {
          bg: 'bg-indigo-950/40',
          border: 'border-indigo-500/40',
          title: 'text-indigo-300',
          iconColor: 'text-indigo-400',
          Icon: FlaskConical
        };
      default:
        return {
          bg: 'bg-slate-900',
          border: 'border-slate-800',
          title: 'text-cyan-300',
          iconColor: 'text-cyan-400',
          Icon: ShieldCheck
        };
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn text-slate-200">
      {/* Chapter Metadata Header */}
      <div className="space-y-4 pb-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30">
            Chapter {chapter.id}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {chapter.part}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400 font-mono">
            {chapter.pages}
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{chapter.readTime}</span>
          </span>
        </div>

        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {chapter.title}
        </h1>

        <p className="text-sm sm:text-base text-emerald-400 font-medium">
          {chapter.subtitle}
        </p>

        {/* Chapter Epigraph Quote */}
        {chapter.quote && (
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 mt-4">
            <Quote className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300 italic">
              "{chapter.quote.text}"
              <span className="block mt-1 font-mono text-[11px] text-emerald-400 not-italic font-bold">
                — {chapter.quote.author}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Highlights Box */}
      {chapter.highlights && (
        <div className="my-8 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Key Social Engineering Vectors & Takeaways</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {chapter.highlights.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chapter Content Stream (No Executive Summary section as per requirements) */}
      <div className="space-y-6 my-8 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
        {chapter.content?.map((block, idx) => {
          if (block.type === 'heading') {
            return (
              <div key={idx} className="pt-8 pb-2 border-b border-slate-800/80 my-4">
                <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
                  <span>{block.text}</span>
                </h2>
              </div>
            );
          }

          if (block.type === 'labeled-item') {
            return (
              <div key={idx} className="my-3.5 pl-3.5 border-l-2 border-emerald-500/40 py-0.5 bg-slate-900/20 rounded-r-lg">
                <p className="text-slate-300 leading-relaxed font-normal text-sm sm:text-base whitespace-pre-line">
                  <strong className="text-emerald-400 font-bold mr-2 tracking-wide font-mono text-xs sm:text-sm">
                    {block.label}
                  </strong>
                  <span>{renderTextWithLinks(block.text)}</span>
                </p>
              </div>
            );
          }

          if (block.type === 'paragraph') {
            const labelMatch = block.text.match(/^([A-Z][A-Za-z0-9 ,/\-\–—]{1,35}:)\s*(.*)/);
            if (labelMatch && labelMatch[1].length < 30) {
              return (
                <div key={idx} className="my-3.5 pl-3.5 border-l-2 border-emerald-500/40 py-0.5 bg-slate-900/20 rounded-r-lg">
                  <p className="text-slate-300 leading-relaxed font-normal text-sm sm:text-base whitespace-pre-line">
                    <strong className="text-emerald-400 font-bold mr-2 tracking-wide font-mono text-xs sm:text-sm">
                      {labelMatch[1]}
                    </strong>
                    <span>{renderTextWithLinks(labelMatch[2])}</span>
                  </p>
                </div>
              );
            }
            return (
              <p key={idx} className="text-slate-300 leading-relaxed font-normal my-3.5 whitespace-pre-line">
                {renderTextWithLinks(block.text)}
              </p>
            );
          }

          if (block.type === 'section-summary' || block.type === 'important-points') {
            return (
              <div 
                key={idx} 
                className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-emerald-950/30 border border-emerald-500/35 shadow-xl shadow-emerald-950/30"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-500/20">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-emerald-300 tracking-wide font-mono flex items-center gap-2">
                    <span>{block.title || 'Section Summary'}</span>
                  </h3>
                </div>

                {block.summary && (
                  <div className="p-4 sm:p-4.5 rounded-xl bg-slate-950/80 border border-emerald-500/25 mb-4 shadow-inner">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Summary</span>
                    </div>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                      {renderTextWithLinks(block.summary)}
                    </p>
                  </div>
                )}

                {block.points && block.points.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Key Takeaways</span>
                    </div>
                    <ul className="space-y-2.5">
                      {block.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-xs shadow-emerald-400/50" />
                          <span className="flex-1">{renderTextWithLinks(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          if (block.type === 'callout') {
            const styles = getCalloutStyles(block.icon);
            const Icon = styles.Icon;
            return (
              <div 
                key={idx} 
                className={`p-4 sm:p-5 rounded-2xl border ${styles.bg} ${styles.border} shadow-md my-6`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2 rounded-xl bg-slate-950/70 border border-slate-800 shrink-0 ${styles.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-heading font-bold text-sm sm:text-base ${styles.title}`}>
                      {block.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {renderTextWithLinks(block.text)}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (block.type === 'activity-ref') {
            const act = ALL_ACTIVITIES[block.activityId];
            if (!act) return null;
            const isDone = completedActivities.includes(act.id);

            return (
              <div key={idx} className="my-10">
                <ActivityRenderer
                  activity={act}
                  isCompleted={isDone}
                  onComplete={onCompleteActivity}
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Bottom Chapter Navigation Bar */}
      <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevChapter ? (
          <button
            onClick={() => {
              onSelectChapter(prevChapter.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Previous Chapter</span>
              <span className="line-clamp-1">{prevChapter.title.replace(/^Chapter \d+:\s*/, '')}</span>
            </div>
          </button>
        ) : <div />}

        {nextChapter ? (
          <button
            onClick={() => {
              onSelectChapter(nextChapter.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <div className="text-right">
              <span className="text-[10px] text-slate-900/70 block uppercase font-mono">Next Chapter</span>
              <span className="line-clamp-1">{nextChapter.title.replace(/^Chapter \d+:\s*/, '')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        ) : <div />}
      </div>
    </article>
  );
}
