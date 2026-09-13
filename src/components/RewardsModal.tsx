import React from 'react';
import { RewardState, BADGES, calculateLevel, triggerCelebrationConfetti, playCelebrationSound } from '../utils/rewardSystem';
import { Trophy, Award, Sparkles, X, Flame, Star, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardState: RewardState;
  onToggleSound: () => void;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  rewardState,
  onToggleSound
}) => {
  if (!isOpen) return null;

  const { level, title, nextLevelXp, currentLevelXp } = calculateLevel(rewardState.totalXp);
  const progressPercent = Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100));

  const handleTestCelebrate = () => {
    if (rewardState.soundEnabled) {
      playCelebrationSound();
    }
    triggerCelebrationConfetti(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col font-sans"
        id="rewards-level-modal"
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Academic Rewards & Achievements
              </h3>
              <p className="text-xs text-slate-400">
                Earn XP, level up, and unlock honors by completing coursework
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Level & XP Overview Card */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/30 rounded-xl p-4.5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black text-amber-400">Level {level}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                  {title}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-white">{rewardState.totalXp} XP</span>
                <span className="text-[11px] text-slate-400 block">Total Earned</span>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Current Tier Progress</span>
                <span>{currentLevelXp} / {nextLevelXp} XP</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Completed Tasks: <strong className="text-white">{rewardState.totalCompleted}</strong>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Flame className="w-4 h-4" />
                Streak: <strong className="text-white">{rewardState.streak}</strong>
              </span>
            </div>
          </div>

          {/* Badges Collection */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-400" />
              Honor Badges
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BADGES.map((badge) => {
                const isUnlocked = rewardState.unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      isUnlocked
                        ? 'bg-slate-950/80 border-amber-500/40 text-slate-100 shadow-xs'
                        : 'bg-slate-950/30 border-slate-800/80 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="text-2xl shrink-0">{badge.icon}</div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold ${isUnlocked ? 'text-amber-300' : 'text-slate-400'}`}>
                          {badge.title}
                        </span>
                        {isUnlocked && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-medium">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sound & Celebration Test Options */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onToggleSound}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 hover:text-white text-xs transition-colors"
            >
              {rewardState.soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Celebration Sound: Enabled</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>Celebration Sound: Muted</span>
                </>
              )}
            </button>

            <button
              onClick={handleTestCelebrate}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 font-semibold text-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Celebration 🎉</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
