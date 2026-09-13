import React from 'react';
import { TaskRecord } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Layers,
  Trophy,
  Sparkles
} from 'lucide-react';
import { RewardState } from '../utils/rewardSystem';

interface StatsBannerProps {
  tasks: TaskRecord[];
  rewardState?: RewardState;
  onOpenRewards?: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ 
  tasks,
  rewardState,
  onOpenRewards
}) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.isCompleted).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const assignments = tasks.filter(t => t.type === 'Assignment');
  const exams = tasks.filter(t => t.type === 'Exam Task');

  const completedAssignments = assignments.filter(a => a.isCompleted).length;
  const completedExams = exams.filter(e => e.isCompleted).length;

  const totalWeightage = exams.reduce((acc, curr) => acc + (curr.weightagePercentage || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" id="stats-overview-grid">
      {/* Total Tasks Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Total Academic Tasks
          </span>
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{total}</span>
          <span className="text-xs text-slate-400 font-medium">registered</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Assignments: <strong className="text-slate-200">{assignments.length}</strong></span>
          <span>Exams: <strong className="text-slate-200">{exams.length}</strong></span>
        </div>
      </div>

      {/* Pending Tasks Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Pending Tasks
          </span>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold text-amber-400 tracking-tight">{pending}</span>
          <span className="text-xs text-slate-400 font-medium">due soon</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Labs/Coursework: <strong className="text-amber-300">{assignments.length - completedAssignments}</strong></span>
          <span>Exams: <strong className="text-amber-300">{exams.length - completedExams}</strong></span>
        </div>
      </div>

      {/* Completed & Progress Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Completion Rate
          </span>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold text-emerald-400 tracking-tight">{completionRate}%</span>
          <span className="text-xs text-slate-400 font-medium">({completed}/{total} completed)</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Academic Rewards & Level Card */}
      <div 
        onClick={onOpenRewards}
        className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4.5 flex flex-col justify-between transition-all cursor-pointer group"
        id="stats-rewards-card"
        title="Click to view full Rewards & Badges"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Academic Level & Rewards
          </span>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold text-amber-400 tracking-tight">
            Level {rewardState ? rewardState.level : 1}
          </span>
          <span className="text-xs text-amber-300 font-medium">
            {rewardState ? `${rewardState.totalXp} XP` : '0 XP'}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>{rewardState?.levelTitle || 'Novice Scholar'}</span>
          <span className="text-amber-400 font-medium group-hover:underline">View Badges →</span>
        </div>
      </div>
    </div>
  );
};
