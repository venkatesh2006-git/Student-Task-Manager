import React, { useState } from 'react';
import { TaskRecord } from '../types';
import { X, Plus, AlertCircle, BookOpen, GraduationCap } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<TaskRecord, 'id'>) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [taskType, setTaskType] = useState<'Assignment' | 'Exam Task'>('Assignment');
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // Assignment fields
  const [subject, setSubject] = useState('');
  const [maxMarks, setMaxMarks] = useState('100');
  const [platform, setPlatform] = useState('');

  // Exam fields
  const [examType, setExamType] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [duration, setDuration] = useState('60');
  const [weightage, setWeightage] = useState('20');

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setCourseCode('');
    setDueDate('');
    setSubject('');
    setMaxMarks('100');
    setPlatform('');
    setExamType('');
    setSyllabus('');
    setDuration('60');
    setWeightage('20');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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
      setError('Task Title is required.');
      return;
    }
    if (!courseCode.trim()) {
      setError('Course Code is required (e.g. CS101 or CSE2006).');
      return;
    }
    if (!dueDate.trim()) {
      setError('Please select a Due Date.');
      return;
    }

    if (taskType === 'Assignment') {
      const marks = parseFloat(maxMarks);
      if (isNaN(marks) || marks < 0) {
        setError('Maximum marks must be a non-negative number.');
        return;
      }

      onAdd({
        type: 'Assignment',
        title: title.trim(),
        courseCode: courseCode.trim().toUpperCase(),
        dueDate: dueDate.trim(),
        isCompleted: false,
        subject: subject.trim() || 'General Coursework',
        maxMarks: marks || 100,
        submissionPlatform: platform.trim() || 'Online Portal'
      });
    } else {
      const dur = parseInt(duration, 10);
      if (isNaN(dur) || dur <= 0) {
        setError('Duration must be greater than 0 minutes.');
        return;
      }
      const weight = parseFloat(weightage);
      if (isNaN(weight) || weight < 0 || weight > 100) {
        setError('Weightage must be between 0% and 100%.');
        return;
      }

      onAdd({
        type: 'Exam Task',
        title: title.trim(),
        courseCode: courseCode.trim().toUpperCase(),
        dueDate: dueDate.trim(),
        isCompleted: false,
        examType: examType.trim() || 'Assessment Exam',
        syllabusTopics: syllabus.trim() || 'All covered modules',
        durationMinutes: dur || 60,
        weightagePercentage: isNaN(weight) ? 20 : weight
      });
    }

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col font-sans"
        id="add-task-modal"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create Academic Task</h2>
              <p className="text-xs text-slate-400">Add an assignment or examination milestone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs sm:text-sm">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center gap-2.5 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Category Toggle */}
          <div>
            <label className="block text-slate-300 mb-1.5 font-medium text-xs">Task Category</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setTaskType('Assignment')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  taskType === 'Assignment'
                    ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-sm'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Assignment / Lab</span>
              </button>
              <button
                type="button"
                onClick={() => setTaskType('Exam Task')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  taskType === 'Exam Task'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-sm'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Exam Milestone</span>
              </button>
            </div>
          </div>

          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="col-span-2">
              <label className="block text-slate-300 mb-1 font-medium text-xs">Task Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Physics Assignment 1 or Midterm Review"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-xs sm:text-sm"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium text-xs">Course Code *</label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g., CS101, MATH201, PHY101"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none uppercase transition-all text-xs sm:text-sm font-semibold"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-300 font-medium text-xs">Due Date *</label>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setDatePreset(0)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Today
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    type="button"
                    onClick={() => setDatePreset(1)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Tomorrow
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    type="button"
                    onClick={() => setDatePreset(7)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    +7 Days
                  </button>
                </div>
              </div>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-xs sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Category-specific fields */}
          {taskType === 'Assignment' ? (
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium text-xs">Subject / Topic</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Object Oriented Programming"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium text-xs">Max Marks</label>
                  <input
                    type="number"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    placeholder="100"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-medium text-xs">Submission Platform</label>
                <input
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="e.g., Google Classroom, Moodle, Portal, In-Person"
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none text-xs sm:text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium text-xs">Exam Category</label>
                  <input
                    type="text"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    placeholder="e.g., Quiz 1, Mid-Term, Final Exam"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium text-xs">Duration (mins)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="60"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium text-xs">Weightage (% of Grade)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightage}
                    onChange={(e) => setWeightage(e.target.value)}
                    placeholder="20"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium text-xs">Syllabus Scope</label>
                  <input
                    type="text"
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    placeholder="e.g., Units 1 to 3, Modules A-C"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md shadow-blue-600/20 text-xs sm:text-sm"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
