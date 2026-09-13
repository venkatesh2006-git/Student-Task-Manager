import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_TASKS } from './data/projectFiles';
import { TaskRecord } from './types';
import { AppNavbar } from './components/AppNavbar';
import { StatsBanner } from './components/StatsBanner';
import { TaskCard } from './components/TaskCard';
import { TaskDetailModal } from './components/TaskDetailModal';
import { AddTaskModal } from './components/AddTaskModal';
import { QuickTaskInput } from './components/QuickTaskInput';
import { CelebrationToast, CelebrationData } from './components/CelebrationToast';
import { RewardsModal } from './components/RewardsModal';
import { 
  RewardState, 
  DEFAULT_REWARD_STATE, 
  calculateLevel, 
  triggerCelebrationConfetti, 
  playCelebrationSound 
} from './utils/rewardSystem';
import { 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  Download, 
  BookOpen, 
  GraduationCap,
  Sparkles,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Trash2,
  Trophy
} from 'lucide-react';

export default function App() {
  // Load tasks from localStorage (purely user-input driven, no built-in tasks)
  const [tasks, setTasks] = useState<TaskRecord[]>(() => {
    try {
      const saved = localStorage.getItem('student_user_tasks_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      // Clean legacy storage key that had built-in demo tasks
      localStorage.removeItem('student_tasks_data');
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return [];
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Assignment' | 'Exam Task'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'title' | 'id'>('dueDate');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals state
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedDetailTask, setSelectedDetailTask] = useState<TaskRecord | null>(null);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState<CelebrationData | null>(null);

  // Rewards state with persistence
  const [rewardState, setRewardState] = useState<RewardState>(() => {
    try {
      const saved = localStorage.getItem('student_rewards_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load rewards state', e);
    }
    return DEFAULT_REWARD_STATE;
  });

  // Sync rewards to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('student_rewards_v1', JSON.stringify(rewardState));
    } catch (e) {
      console.warn('Could not persist rewards state', e);
    }
  }, [rewardState]);

  const handleToggleSound = () => {
    setRewardState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('student_user_tasks_v3', JSON.stringify(tasks));
    } catch (e) {
      console.warn('Could not persist tasks', e);
    }
  }, [tasks]);

  // Unique course codes for filter dropdown
  const uniqueCourseCodes = useMemo(() => {
    const codes = new Set<string>();
    tasks.forEach(t => codes.add(t.courseCode));
    return Array.from(codes).sort();
  }, [tasks]);

  // Task Operations
  const handleAddTask = (newTaskData: Omit<TaskRecord, 'id'>) => {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1001;
    const newTask: TaskRecord = {
      ...newTaskData,
      id: nextId
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleClearAllTasks = () => {
    if (tasks.length === 0) return;
    if (window.confirm('Are you sure you want to remove all tasks from your list?')) {
      setTasks([]);
      setSelectedDetailTask(null);
    }
  };

  const handleToggleComplete = (id: number) => {
    const target = tasks.find(t => t.id === id);
    if (!target) return;

    const willBeCompleted = !target.isCompleted;

    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const updated = { ...t, isCompleted: willBeCompleted };
        if (selectedDetailTask && selectedDetailTask.id === id) {
          setSelectedDetailTask(updated);
        }
        return updated;
      }
      return t;
    }));

    // Trigger celebration & reward when marking as completed
    if (willBeCompleted) {
      const isExam = target.type === 'Exam Task';
      const xpGain = isExam ? 100 : 50;
      const newTotalXp = rewardState.totalXp + xpGain;
      const newCompletedCount = rewardState.totalCompleted + 1;
      const newStreak = rewardState.streak + 1;
      const { level, title } = calculateLevel(newTotalXp);

      // Check for newly unlocked badges
      const currentBadges = new Set(rewardState.unlockedBadges);
      let newlyUnlockedBadgeTitle: string | undefined = undefined;

      if (newCompletedCount >= 1 && !currentBadges.has('first_task')) {
        currentBadges.add('first_task');
        newlyUnlockedBadgeTitle = 'First Step';
      }
      if (newCompletedCount >= 3 && !currentBadges.has('streak_3')) {
        currentBadges.add('streak_3');
        newlyUnlockedBadgeTitle = 'High Velocity';
      }
      if (isExam && !currentBadges.has('exam_hero')) {
        currentBadges.add('exam_hero');
        newlyUnlockedBadgeTitle = 'Exam Conqueror';
      }
      if (newTotalXp >= 300 && !currentBadges.has('xp_300')) {
        currentBadges.add('xp_300');
        newlyUnlockedBadgeTitle = 'Master Mind';
      }

      // Check if this completes all tasks registered
      const otherTasks = tasks.filter(t => t.id !== id);
      const isAllCompleted = otherTasks.length > 0 && otherTasks.every(t => t.isCompleted);
      if (isAllCompleted && !currentBadges.has('all_done')) {
        currentBadges.add('all_done');
        newlyUnlockedBadgeTitle = 'Grand Perfectionist';
      }

      setRewardState(prev => ({
        ...prev,
        totalXp: newTotalXp,
        level,
        levelTitle: title,
        streak: newStreak,
        totalCompleted: newCompletedCount,
        unlockedBadges: Array.from(currentBadges)
      }));

      // Fire audio & confetti celebrations
      if (rewardState.soundEnabled) {
        playCelebrationSound();
      }
      triggerCelebrationConfetti(isAllCompleted);

      // Show toast celebration banner
      setCelebrationData({
        taskTitle: target.title,
        taskType: target.type,
        earnedXp: xpGain,
        newBadge: newlyUnlockedBadgeTitle,
        isGrandCelebration: isAllCompleted
      });
    } else {
      // If unmarked from complete, decrement streak gracefully
      setRewardState(prev => ({
        ...prev,
        streak: Math.max(0, prev.streak - 1)
      }));
    }
  };

  const handleDeleteTask = (id: number): boolean => {
    let existed = false;
    setTasks(prev => {
      existed = prev.some(t => t.id === id);
      return prev.filter(t => t.id !== id);
    });
    if (selectedDetailTask && selectedDetailTask.id === id) {
      setSelectedDetailTask(null);
    }
    return existed;
  };

  const handleExportTasks = () => {
    // Generate pipe-delimited flat file matching data/tasks.txt
    const lines = tasks.map(t => {
      if (t.type === 'Assignment') {
        return `ASSIGNMENT|${t.id}|${t.title}|${t.courseCode}|${t.dueDate}|${t.isCompleted}|${t.subject || ''}|${t.maxMarks || 0}|${t.submissionPlatform || ''}`;
      } else {
        return `EXAM|${t.id}|${t.title}|${t.courseCode}|${t.dueDate}|${t.isCompleted}|${t.examType || ''}|${t.syllabusTopics || ''}|${t.durationMinutes || 0}|${t.weightagePercentage || 0}`;
      }
    });

    const fileContent = lines.join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tasks.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered & Sorted tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      // Category filter
      if (categoryFilter !== 'All' && t.type !== categoryFilter) return false;

      // Status filter
      if (statusFilter === 'Pending' && t.isCompleted) return false;
      if (statusFilter === 'Completed' && !t.isCompleted) return false;

      // Course filter
      if (courseFilter !== 'All' && t.courseCode !== courseFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchCourse = t.courseCode.toLowerCase().includes(q);
        const matchSubject = t.subject ? t.subject.toLowerCase().includes(q) : false;
        const matchExam = t.examType ? t.examType.toLowerCase().includes(q) : false;
        const matchSyllabus = t.syllabusTopics ? t.syllabusTopics.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchCourse && !matchSubject && !matchExam && !matchSyllabus) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return a.id - b.id;
    });
  }, [tasks, categoryFilter, statusFilter, courseFilter, searchQuery, sortBy]);

  const assignmentsCount = tasks.filter(t => t.type === 'Assignment').length;
  const examsCount = tasks.filter(t => t.type === 'Exam Task').length;

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans" id="student-task-manager-app">
      {/* Top Navbar */}
      <AppNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddTask={() => setIsAddTaskModalOpen(true)}
        onExportTasks={handleExportTasks}
        onOpenRewards={() => setIsRewardsModalOpen(true)}
        rewardState={rewardState}
        totalTasks={tasks.length}
        completedTasks={tasks.filter(t => t.isCompleted).length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Title & Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              Academic Tasks & Assessments
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Track university coursework, lab submissions, CAT assessments, and exam deadlines with automated flat-file persistence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRewardsModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg shadow-sm transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Rewards & Badges</span>
            </button>
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Task</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Banner */}
        <StatsBanner 
          tasks={tasks} 
          rewardState={rewardState}
          onOpenRewards={() => setIsRewardsModalOpen(true)}
        />

        {/* User Input System: Inline Quick Task Entry */}
        <QuickTaskInput onAddTask={handleAddTask} />

        {/* Filter & Toolbar Area */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setCategoryFilter('All')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                categoryFilter === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Tasks ({tasks.length})
            </button>
            <button
              onClick={() => setCategoryFilter('Assignment')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                categoryFilter === 'Assignment'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Assignments ({assignmentsCount})</span>
            </button>
            <button
              onClick={() => setCategoryFilter('Exam Task')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                categoryFilter === 'Exam Task'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Exams ({examsCount})</span>
            </button>
          </div>

          {/* Secondary Filters & Sorts */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Only</option>
              <option value="Completed">Completed Only</option>
            </select>

            {/* Course Code Dropdown */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Courses</option>
              {uniqueCourseCodes.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="title">Sort by Title</option>
              <option value="id">Sort by Task ID</option>
            </select>

            {/* Grid / List View Toggle */}
            <div className="flex items-center p-1 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-400">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-slate-800 text-white' : 'hover:text-slate-200'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-slate-800 text-white' : 'hover:text-slate-200'
                }`}
                title="Compact List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Clear All Tasks Button (if any tasks exist) */}
            {tasks.length > 0 && (
              <button
                onClick={handleClearAllTasks}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 rounded-lg transition-colors"
                title="Clear all tasks from list"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Task Items Feed */}
        {filteredTasks.length === 0 ? (
          <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-200">
              {tasks.length === 0 ? 'No tasks yet — ready for your input' : 'No matching tasks found'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
              {tasks.length === 0
                ? 'All built-in demo tasks have been removed. Use the User Input section above or click below to add your academic tasks.'
                : 'Try clearing your search query or reset your filters to see more tasks.'}
            </p>
            <div className="flex items-center gap-2">
              {tasks.length > 0 && (searchQuery || categoryFilter !== 'All' || statusFilter !== 'All' || courseFilter !== 'All') ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setStatusFilter('All');
                    setCourseFilter('All');
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                >
                  Reset Filters
                </button>
              ) : (
                <button
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Open Detailed Task Form</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div 
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'
                : 'flex flex-col space-y-3 mb-10'
            }
          >
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onViewDetails={(t) => setSelectedDetailTask(t)}
                onDelete={handleDeleteTask}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 text-center text-xs text-slate-500">
        <p>Student Task &amp; Assignment Manager • Academic Coursework &amp; Exam Tracker</p>
      </footer>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAdd={handleAddTask}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedDetailTask}
        onClose={() => setSelectedDetailTask(null)}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />

      {/* Rewards & Level Honors Modal */}
      <RewardsModal
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
        rewardState={rewardState}
        onToggleSound={handleToggleSound}
      />

      {/* Celebration & Reward Toast Banner */}
      <CelebrationToast
        data={celebrationData}
        onClose={() => setCelebrationData(null)}
        soundEnabled={rewardState.soundEnabled}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
}
