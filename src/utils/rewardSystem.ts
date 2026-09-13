import confetti from 'canvas-confetti';

export interface RewardState {
  totalXp: number;
  level: number;
  levelTitle: string;
  streak: number;
  totalCompleted: number;
  soundEnabled: boolean;
  unlockedBadges: string[];
}

export const DEFAULT_REWARD_STATE: RewardState = {
  totalXp: 0,
  level: 1,
  levelTitle: 'Novice Scholar',
  streak: 0,
  totalCompleted: 0,
  soundEnabled: true,
  unlockedBadges: []
};

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredXp?: number;
  requiredTasks?: number;
}

export const BADGES: BadgeDefinition[] = [
  {
    id: 'first_task',
    title: 'First Step',
    description: 'Completed your very first task',
    icon: '🌱',
    requiredTasks: 1
  },
  {
    id: 'streak_3',
    title: 'High Velocity',
    description: 'Completed 3 academic tasks',
    icon: '⚡',
    requiredTasks: 3
  },
  {
    id: 'exam_hero',
    title: 'Exam Conqueror',
    description: 'Finished an Exam milestone preparation',
    icon: '🎯'
  },
  {
    id: 'xp_300',
    title: 'Master Mind',
    description: 'Accumulated 300+ Academic XP points',
    icon: '👑',
    requiredXp: 300
  },
  {
    id: 'all_done',
    title: 'Grand Perfectionist',
    description: 'Finished 100% of your current academic tasks',
    icon: '🌟'
  }
];

export const MOTIVATIONAL_QUOTES = [
  "Fantastic focus! Every completed task brings you closer to top grades.",
  "Great job! Consistency is the true secret of academic success.",
  "Boom! Another assignment conquered. Keep the momentum going!",
  "Shabash! One step closer to finishing all your coursework.",
  "Superb discipline! Your future self is thanking you right now.",
  "Milestone reached! Take a moment to celebrate this win."
];

// Audio chime using standard Web Audio API
export function playCelebrationSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.08);
      osc.stop(ctx.currentTime + index * 0.08 + 0.4);
    });
  } catch {
    // Audio contexts might be blocked until user interacts, fail gracefully
  }
}

// Confetti burst
export function triggerCelebrationConfetti(isGrand = false) {
  try {
    if (isGrand) {
      // Grand celebration when all tasks are complete
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      // Standard joyful burst
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa']
      });

      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 45,
          origin: { x: 0.1, y: 0.6 }
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 45,
          origin: { x: 0.9, y: 0.6 }
        });
      }, 150);
    }
  } catch (err) {
    console.warn('Could not launch confetti', err);
  }
}

export function calculateLevel(xp: number): { level: number; title: string; nextLevelXp: number; currentLevelXp: number } {
  // 150 XP per level
  const xpPerLevel = 150;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const nextLevelXp = xpPerLevel;

  let title = 'Novice Scholar';
  if (level >= 5) title = "Dean's List Legend";
  else if (level === 4) title = 'Honor Roll Scholar';
  else if (level === 3) title = 'Academic Achiever';
  else if (level === 2) title = 'Focused Learner';

  return { level, title, nextLevelXp, currentLevelXp };
}
