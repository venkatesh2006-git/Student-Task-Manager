import React from 'react';
import { TaskRecord } from '../types';
import { 
  X, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Tag, 
  Trash2,
  Check
} from 'lucide-react';

interface TaskDetailModalProps {
  task: TaskRecord | null;
  onClose: () => void;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onToggleComplete,
  onDelete
}) => {
  if (!task) return null;

  const isAssignment = task.type === 'Assignment';

  // Build the corresponding data/tasks.txt representation
  const fileStorageString = isAssignment
    ? `ASSIGNMENT|${task.id}|${task.title}|${task.courseCode}|${task.dueDate}|${task.isCompleted}|${task.subject || ''}|${task.maxMarks || 0}|${task.submissionPlatform || ''}`
    : `EXAM|${task.id}|${task.title}|${task.courseCode}|${task.dueDate}|${task.isCompleted}|${task.examType || ''}|${task.syllabusTopics || ''}|${task.durationMinutes || 0}|${task.weightagePercentage || 0}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col font-sans"
        id="task-detail-modal"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span 
              className={`p-2 rounded-lg ${
                isAssignment 
                  ? 'bg-blue-500/10 text-blue-400' 
                  : 'bg-amber-500/10 text-amber-400'
              }`}
            >
              {isAssignment ? <BookOpen className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-slate-400">#{task.id}</span>
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  {task.courseCode}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  task.isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {task.isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-1">{task.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs sm:text-sm text-slate-300 overflow-y-auto max-h-[70vh]">
          {/* Due Date & Category */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Due Date</span>
              <div className="flex items-center gap-1.5 font-medium text-slate-100">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{task.dueDate}</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Task Category</span>
              <span className="font-medium text-slate-100">{task.type}</span>
            </div>
          </div>

          {/* Type-Specific Data */}
          {isAssignment ? (
            <div className="space-y-3 bg-slate-950/40 rounded-lg p-3.5 border border-slate-800/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Assignment Specification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Subject / Module:</span>
                  <span className="font-medium text-slate-100">{task.subject}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Maximum Marks:</span>
                  <span className="font-semibold text-emerald-400">{task.maxMarks} points</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block">Submission Platform:</span>
                  <span className="font-medium text-slate-100">{task.submissionPlatform}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 bg-slate-950/40 rounded-lg p-3.5 border border-slate-800/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Examination Milestone
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Exam Type:</span>
                  <span className="font-medium text-amber-300">{task.examType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Duration & Weightage:</span>
                  <span className="font-semibold text-slate-100">
                    {task.durationMinutes} mins • {task.weightagePercentage}% of grade
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block mb-1">Syllabus Scope:</span>
                  <div className="bg-slate-900 p-2.5 rounded text-slate-200 italic border border-slate-800">
                    {task.syllabusTopics}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Java Flat-File Record Preview (data/tasks.txt) */}
          <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono font-medium text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                data/tasks.txt Record String (Pipe-delimited):
              </span>
            </div>
            <code className="block text-[11px] font-mono text-emerald-400 bg-black/40 p-2 rounded overflow-x-auto select-all whitespace-pre">
              {fileStorageString}
            </code>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
          <button
            onClick={() => {
              onDelete(task.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Task</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                task.isCompleted
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
              }`}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{task.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
