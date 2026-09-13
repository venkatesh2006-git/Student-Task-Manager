import React, { useState } from 'react';
import { TaskRecord } from '../types';
import { Plus, BookOpen, GraduationCap, Calendar, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuickTaskInputProps {
  onAddTask: (task: Omit<TaskRecord, 'id'>) => void;
}

export const QuickTaskInput: React.FC<QuickTaskInputProps> = ({ onAddTask }) => {
  const [taskType, setTaskType] = useState<'Assignment' | 'Exam Task'>('Assignment');
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [justAddedMessage, setJustAddedMessage] = useState<string | null>(null);

  // Extra details
  const [subject, setSubject] = useState('');
  const [maxMarks, setMaxMarks] = useState('100');
  const [platform, setPlatform] = useState('');
  const [examType, setExamType] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [duration, setDuration] = useState('60');
  const [weightage, setWeightage] = useState('20');
  const [error, setError] = useState<string | null>(null);

  const setDatePreset = (daysOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDueDate(`${yyyy}-${mm}-${dd}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    if (!courseCode.trim()) {
      setError('Please enter a course code (e.g., CS101, PHY102).');
      return;
    }

    if (!dueDate) {
      setError('Please select a due date.');
      return;
    }

    if (taskType === 'Assignment') {
      const marks = parseFloat(maxMarks) || 100;
      onAddTask({
        type: 'Assignment',
        title: title.trim(),
        courseCode: courseCode.trim().toUpperCase(),
        dueDate: dueDate.trim(),
        isCompleted: false,
        subject: subject.trim() || 'General Coursework',
        maxMarks: marks,
        submissionPlatform: platform.trim() || 'Online Portal'
      });
    } else {
      const dur = parseInt(duration, 10) || 60;
      const weight = parseFloat(weightage) || 20;
      onAddTask({
        type: 'Exam Task',
        title: title.trim(),
        courseCode: courseCode.trim().toUpperCase(),
        dueDate: dueDate.trim(),
        isCompleted: false,
        examType: examType.trim() || 'Assessment Exam',
        syllabusTopics: syllabus.trim() || 'All covered modules',
        durationMinutes: dur,
        weightagePercentage: weight
      });
    }

    const addedTitle = title.trim();
    // Reset fields
    setTitle('');
    setDueDate('');
    setSubject('');
    setPlatform('');
    setExamType('');
    setSyllabus('');
    setError(null);
    setJustAddedMessage(`Added "${addedTitle}"`);
    setTimeout(() => {
      setJustAddedMessage(null);
    }, 3000);
  };

  return (
    <div 
      id="quick-task-input-section" 
      className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg mb-8 relative overflow-hidden"
    >
      {/* Accent top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 opacity-80" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              User Input: Add Academic Task
              {justAddedMessage && (
                <span className="inline-flex items-center gap-1 text-[11px] font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full animate-fade-in">
                  <CheckCircle2 className="w-3 h-3" />
                  {justAddedMessage}
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-400">Enter your course assignments or exam milestones directly</p>
          </div>
        </div>

        {/* Type toggle */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTaskType('Assignment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              taskType === 'Assignment'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Assignment</span>
          </button>
          <button
            type="button"
            onClick={() => setTaskType('Exam Task')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              taskType === 'Exam Task'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Exam Milestone</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 px-3 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Main Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Title */}
          <div className="md:col-span-6">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Task Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={taskType === 'Assignment' ? "e.g., Data Structures Lab 2" : "e.g., Mid-Term Assessment"}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Course Code */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Course Code <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g., CS101"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 uppercase font-semibold"
            />
          </div>

          {/* Due Date */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-medium text-slate-400">
                Due Date <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <button
                  type="button"
                  onClick={() => setDatePreset(0)}
                  className="hover:text-blue-400 transition-colors"
                >
                  Today
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setDatePreset(1)}
                  className="hover:text-blue-400 transition-colors"
                >
                  Tmrw
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setDatePreset(7)}
                  className="hover:text-blue-400 transition-colors"
                >
                  +7d
                </button>
              </div>
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Expandable Optional Details */}
        {isExpanded && (
          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in text-xs">
            {taskType === 'Assignment' ? (
              <>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Subject / Module</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Algorithms"
                    className="w-full bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    placeholder="100"
                    className="w-full bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Platform</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="e.g., Moodle / Classroom"
                    className="w-full bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Exam Type</label>
                  <input
                    type="text"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    placeholder="e.g., Mid-Term"
                    className="w-full bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="60"
                    className="w-full bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Weightage (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={weightage}
                    onChange={(e) => setWeightage(e.target.value)}
                    placeholder="20"
                    className="w-full bg-slate-950 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Buttons Row */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Less Details</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>More Details (Marks, Weightage, Syllabus...)</span>
              </>
            )}
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-xs rounded-lg shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </div>
  );
};
