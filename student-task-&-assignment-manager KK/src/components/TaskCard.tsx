import React from 'react';
import { TaskRecord } from '../types';
import { 
  Check, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';

interface TaskCardProps {
  task: TaskRecord;
  onToggleComplete: (id: number) => void;
  onViewDetails: (task: TaskRecord) => void;
  onDelete: (id: number) => void;
  viewMode: 'grid' | 'list';
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onViewDetails,
  onDelete,
  viewMode
}) => {
  const isAssignment = task.type === 'Assignment';

  // Calculate urgency based on due date
  const getUrgencyBadge = (dueDateStr: string) => {
    try {
      const due = new Date(dueDateStr);
      const now = new Date('2026-09-03'); // Anchor to mock semester date or current date
      const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-full">Overdue</span>;
      }
      if (diffDays <= 3) {
        return <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">Due in {diffDays}d</span>;
      }
      if (diffDays <= 7) {
        return <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-full">In {diffDays}d</span>;
      }
      return <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{dueDateStr}</span>;
    } catch {
      return <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{dueDateStr}</span>;
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
          task.isCompleted 
            ? 'bg-slate-900/40 border-slate-800/60 opacity-80' 
            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-sm'
        }`}
        id={`task-item-${task.id}`}
      >
        <div className="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
          {/* Completion Checkbox */}
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            title={task.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all mt-0.5 md:mt-0 shrink-0 ${
              task.isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                : 'border-slate-600 hover:border-blue-400 bg-slate-800/60 text-transparent'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {/* Task Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-slate-400 font-semibold">
                #{task.id}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-200 px-2 py-0.5 rounded">
                {task.courseCode}
              </span>
              <span 
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                  isAssignment 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}
              >
                {isAssignment ? <BookOpen className="w-2.5 h-2.5" /> : <GraduationCap className="w-2.5 h-2.5" />}
                {task.type}
              </span>
              {task.isCompleted ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  🎉 +{task.type === 'Exam Task' ? '100' : '50'} XP Earned
                </span>
              ) : (
                getUrgencyBadge(task.dueDate)
              )}
            </div>

            <h3 
              className={`text-sm font-semibold truncate transition-colors ${
                task.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
              }`}
            >
              {task.title}
            </h3>

            {/* Sub details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
              {isAssignment ? (
                <>
                  <span>Subject: <strong className="text-slate-300 font-medium">{task.subject || 'General'}</strong></span>
                  <span>Max Marks: <strong className="text-slate-300 font-medium">{task.maxMarks} pts</strong></span>
                  <span>Platform: <strong className="text-slate-300 font-medium">{task.submissionPlatform || 'Portal'}</strong></span>
                </>
              ) : (
                <>
                  <span>Type: <strong className="text-slate-300 font-medium">{task.examType}</strong></span>
                  <span>Duration: <strong className="text-slate-300 font-medium">{task.durationMinutes}m</strong></span>
                  <span>Weightage: <strong className="text-amber-400 font-medium">{task.weightagePercentage}%</strong></span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={() => onViewDetails(task)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="View Task Details"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Details</span>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Grid Card Layout
  return (
    <div 
      className={`group flex flex-col justify-between p-5 rounded-xl border transition-all ${
        task.isCompleted 
          ? 'bg-slate-900/40 border-slate-800/60 opacity-80' 
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-lg shadow-sm'
      }`}
      id={`task-card-${task.id}`}
    >
      <div>
        {/* Card Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span 
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                isAssignment 
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {isAssignment ? <BookOpen className="w-2.5 h-2.5" /> : <GraduationCap className="w-2.5 h-2.5" />}
              {task.type}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-200 px-2 py-0.5 rounded">
              {task.courseCode}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {task.isCompleted ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Done 🎉
              </span>
            ) : (
              getUrgencyBadge(task.dueDate)
            )}
            <span className="text-[10px] font-mono text-slate-400 font-semibold">
              #{task.id}
            </span>
          </div>
        </div>

        {/* Card Title & Completion Checkbox */}
        <div className="flex items-start gap-3 mb-3">
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            title={task.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all mt-0.5 shrink-0 ${
              task.isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                : 'border-slate-600 hover:border-blue-400 bg-slate-800/60 text-transparent'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </button>
          <h3 
            className={`text-base font-semibold leading-snug line-clamp-2 transition-colors ${
              task.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
            }`}
          >
            {task.title}
          </h3>
        </div>

        {/* Polymorphic Content Section */}
        <div className="bg-slate-950/60 rounded-lg p-3 text-xs space-y-1.5 mb-4 border border-slate-800/80">
          {isAssignment ? (
            <>
              <div className="flex items-center justify-between text-slate-400">
                <span>Subject:</span>
                <span className="font-medium text-slate-200 truncate max-w-[150px]">{task.subject || 'Coursework'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Max Marks:</span>
                <span className="font-semibold text-emerald-400">{task.maxMarks} pts</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Platform:</span>
                <span className="font-medium text-slate-200">{task.submissionPlatform || 'Online'}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-slate-400">
                <span>Exam Category:</span>
                <span className="font-medium text-amber-300">{task.examType}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Duration / Weight:</span>
                <span className="font-semibold text-slate-200">{task.durationMinutes} mins • {task.weightagePercentage}%</span>
              </div>
              <div className="text-slate-400 pt-1">
                <span className="text-[11px] block text-slate-400 mb-0.5">Syllabus Scope:</span>
                <p className="text-[11px] text-slate-300 line-clamp-2 italic">{task.syllabusTopics}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{task.dueDate}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onViewDetails(task)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
