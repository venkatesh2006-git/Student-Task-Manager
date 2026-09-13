import React, { useEffect } from 'react';
import { Sparkles, Trophy, X, Volume2, VolumeX, CheckCircle2, Flame } from 'lucide-react';

export interface CelebrationData {
  taskTitle: string;
  taskType: string;
  earnedXp: number;
  newBadge?: string;
  isGrandCelebration?: boolean;
}

interface CelebrationToastProps {
  data: CelebrationData | null;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CelebrationToast: React.FC<CelebrationToastProps> = ({
  data,
  onClose,
  soundEnabled,
  onToggleSound
}) => {
  useEffect(() => {
    if (!data) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div 
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] animate-bounce-short"
      id="celebration-reward-toast"
    >
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400/50 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-amber-500/20 text-slate-100 relative overflow-hidden backdrop-blur-md">
        {/* Glow ambient background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 shadow-inner text-xl">
              {data.isGrandCelebration ? '🌟' : '🎉'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {data.isGrandCelebration ? 'All Tasks Completed!' : 'Task Completed!'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  +{data.earnedXp} XP
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mt-0.5 line-clamp-1">
                {data.taskTitle}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleSound}
              title={soundEnabled ? "Mute celebration chimes" : "Unmute celebration chimes"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {data.newBadge && (
          <div className="mt-3 py-1.5 px-3 bg-amber-500/15 border border-amber-400/40 rounded-lg flex items-center gap-2 text-xs text-amber-200">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              New Achievement Unlocked: <strong>{data.newBadge}</strong>
            </span>
          </div>
        )}

        <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Academic Progress Saved
          </span>
          <span className="text-amber-400 font-medium">Keep the streak alive!</span>
        </div>

        {/* Dismiss progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 animate-[shrink_5s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
};
