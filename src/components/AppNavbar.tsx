import React from 'react';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Download, 
  CheckCircle2, 
  BookOpen,
  Trophy,
  Sparkles
} from 'lucide-react';
import { RewardState } from '../utils/rewardSystem';

interface AppNavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAddTask: () => void;
  onExportTasks: () => void;
  onOpenRewards: () => void;
  rewardState: RewardState;
  totalTasks: number;
  completedTasks: number;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAddTask,
  onExportTasks,
  onOpenRewards,
  rewardState,
  totalTasks,
  completedTasks
}) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 lg:px-8 py-3 transition-colors" id="app-navigation-header">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Project Identity */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Student Task Manager
                </h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  CSE2006
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Academic Coursework, Labs & Exam Milestone Tracker
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, courses, topics..."
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            id="task-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Rewards & Level Trophy Badge */}
          <button
            onClick={onOpenRewards}
            title="View Academic Honors, XP & Level Rewards"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg shadow-sm transition-all"
            id="open-rewards-modal-button"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-bold">Lv.{rewardState.level}</span>
            <span className="text-[11px] text-amber-400/80 hidden sm:inline">({rewardState.totalXp} XP)</span>
          </button>

          {/* Export tasks.txt */}
          <button
            onClick={onExportTasks}
            title="Download data/tasks.txt flat file"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-all"
            id="export-tasks-button"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export tasks.txt</span>
          </button>

          {/* Primary Action: Add Task */}
          <button
            onClick={onOpenAddTask}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-98 rounded-lg shadow-md shadow-blue-600/25 transition-all"
            id="add-task-header-button"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};
