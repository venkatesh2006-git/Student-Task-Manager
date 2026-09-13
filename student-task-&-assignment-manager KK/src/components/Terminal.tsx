import React, { useState, useEffect, useRef } from 'react';
import { TaskRecord, TerminalLine } from '../types';
import { 
  Terminal as TerminalIcon, 
  Trash2, 
  Play, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

interface TerminalProps {
  tasks: TaskRecord[];
  onAddTask: (task: Omit<TaskRecord, 'id'>) => void;
  onMarkCompleted: (id: number) => boolean;
  onDeleteTask: (id: number) => boolean;
  onSaveTasks: () => void;
  onResetTasks: () => void;
  isBuilding: boolean;
  terminalHeight: number;
  onToggleHeight: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  tasks,
  onAddTask,
  onMarkCompleted,
  onDeleteTask,
  onSaveTasks,
  onResetTasks,
  isBuilding,
  terminalHeight,
  onToggleHeight
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', text: '$ javac -d out src/*.java', type: 'command' },
    { id: '2', text: '[INFO] Compiling 7 Java SE 17 source files...', type: 'info' },
    { id: '3', text: '[SUCCESS] Build completed successfully: 7 class files in out/', type: 'success' },
    { id: '4', text: '$ java -cp out Main', type: 'command' },
    { id: '5', text: 'Initializing Student Task & Assignment Manager...', type: 'info' },
    { id: '6', text: '[INFO] Successfully loaded 2 existing task(s) from data/tasks.txt', type: 'info' },
    { id: '7', text: '========================================', type: 'header' },
    { id: '8', text: '       STUDENT TASK MANAGER', type: 'header' },
    { id: '9', text: '========================================', type: 'header' },
    { id: '10', text: '1. Add Task', type: 'stdout' },
    { id: '11', text: '2. View Tasks', type: 'stdout' },
    { id: '12', text: '3. Search Task', type: 'stdout' },
    { id: '13', text: '4. Mark Task Completed', type: 'stdout' },
    { id: '14', text: '5. Delete Task', type: 'stdout' },
    { id: '15', text: '6. Show Statistics', type: 'stdout' },
    { id: '16', text: '7. Save & Exit', type: 'stdout' },
    { id: '17', text: '========================================', type: 'header' },
    { id: '18', text: 'Enter your choice (1-7): ', type: 'stdout' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const addLines = (newLines: Omit<TerminalLine, 'id'>[]) => {
    setLines(prev => [
      ...prev,
      ...newLines.map(l => ({ ...l, id: Math.random().toString(36).substring(2, 9) }))
    ]);
  };

  const handleMenuOption = (choice: string) => {
    const opt = choice.trim();

    switch (opt) {
      case '1': {
        // Add sample task with prompt
        const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1001;
        const isExam = tasks.length % 2 === 1;
        
        if (isExam) {
          const newExam: Omit<TaskRecord, 'id'> = {
            type: 'Exam Task',
            title: `Assessment Milestone ${nextId}`,
            courseCode: 'CSE2006',
            dueDate: '2026-10-18',
            isCompleted: false,
            examType: 'Lab FAT Assessment',
            syllabusTopics: 'File Streams, Custom Exceptions, Polymorphic Collections',
            durationMinutes: 120,
            weightagePercentage: 25.0
          };
          onAddTask(newExam);
          addLines([
            { text: `> 1`, type: 'command' },
            { text: '--- [ Add New Task ] ---', type: 'header' },
            { text: 'Category: Exam Task / Assessment Milestone', type: 'info' },
            { text: `Enter Task Title: Assessment Milestone ${nextId}`, type: 'stdout' },
            { text: 'Enter Course Code: CSE2006', type: 'stdout' },
            { text: 'Enter Due Date: 2026-10-18', type: 'stdout' },
            { text: 'Enter Exam Type: Lab FAT Assessment', type: 'stdout' },
            { text: 'Enter Syllabus Topics: File Streams, Custom Exceptions', type: 'stdout' },
            { text: 'Enter Duration: 120 minutes', type: 'stdout' },
            { text: 'Enter Weightage: 25.0%', type: 'stdout' },
            { text: `[SUCCESS] ExamTask #${nextId} created successfully!`, type: 'success' },
            { text: 'Enter your choice (1-7): ', type: 'stdout' }
          ]);
        } else {
          const newAssignment: Omit<TaskRecord, 'id'> = {
            type: 'Assignment',
            title: `Lab Task ${nextId} Dynamic Dispatch`,
            courseCode: 'CSE2006',
            dueDate: '2026-09-28',
            isCompleted: false,
            subject: 'Object Oriented Programming',
            maxMarks: 100.0,
            submissionPlatform: 'Moodle'
          };
          onAddTask(newAssignment);
          addLines([
            { text: `> 1`, type: 'command' },
            { text: '--- [ Add New Task ] ---', type: 'header' },
            { text: 'Category: Academic Assignment / Lab Work', type: 'info' },
            { text: `Enter Task Title: Lab Task ${nextId} Dynamic Dispatch`, type: 'stdout' },
            { text: 'Enter Course Code: CSE2006', type: 'stdout' },
            { text: 'Enter Due Date: 2026-09-28', type: 'stdout' },
            { text: 'Enter Subject: Object Oriented Programming', type: 'stdout' },
            { text: 'Enter Max Marks: 100.0', type: 'stdout' },
            { text: 'Enter Submission Platform: Moodle', type: 'stdout' },
            { text: `[SUCCESS] Assignment #${nextId} created successfully!`, type: 'success' },
            { text: 'Enter your choice (1-7): ', type: 'stdout' }
          ]);
        }
        break;
      }

      case '2': {
        // View Tasks table
        const tableHeader = '----------------------------------------------------------------------------------';
        const colHeader = 'ID     | CATEGORY       | COURSE     | TITLE                    | DUE DATE     | STATUS    ';
        const taskRows = tasks.map(t => {
          const idStr = `#${t.id}`.padEnd(6);
          const catStr = t.type.padEnd(14);
          const courseStr = t.courseCode.padEnd(10);
          const titleStr = (t.title.length > 24 ? t.title.substring(0, 21) + '...' : t.title).padEnd(24);
          const dueStr = t.dueDate.padEnd(12);
          const statusStr = (t.isCompleted ? 'Completed' : 'Pending').padEnd(10);
          return `${idStr} | ${catStr} | ${courseStr} | ${titleStr} | ${dueStr} | ${statusStr}`;
        });

        addLines([
          { text: `> 2`, type: 'command' },
          { text: tableHeader, type: 'dim' },
          { text: colHeader, type: 'header' },
          { text: tableHeader, type: 'dim' },
          ...taskRows.map(r => ({ text: r, type: 'stdout' as const })),
          { text: tableHeader, type: 'dim' },
          { text: `Total: ${tasks.length} task(s)`, type: 'info' },
          { text: 'Enter your choice (1-7): ', type: 'stdout' }
        ]);
        break;
      }

      case '3': {
        // Search Task
        const matching = tasks.filter(t => 
          t.title.toLowerCase().includes('polymorphism') || 
          t.courseCode.toLowerCase().includes('cse2006') ||
          (t.subject && t.subject.toLowerCase().includes('oop'))
        );
        addLines([
          { text: `> 3`, type: 'command' },
          { text: '--- [ Search Tasks ] ---', type: 'header' },
          { text: 'Enter search keyword: CSE2006', type: 'stdout' },
          { text: `[SEARCH RESULTS] Found ${matching.length} matching task(s):`, type: 'info' },
          ...matching.map(t => ({
            text: `  • #${t.id} [${t.type}] ${t.title} (${t.courseCode}) - Due: ${t.dueDate} - Status: ${t.isCompleted ? 'Completed' : 'Pending'}`,
            type: 'stdout' as const
          })),
          { text: 'Enter your choice (1-7): ', type: 'stdout' }
        ]);
        break;
      }

      case '4': {
        // Mark Task Completed
        const pending = tasks.find(t => !t.isCompleted);
        if (pending) {
          onMarkCompleted(pending.id);
          addLines([
            { text: `> 4`, type: 'command' },
            { text: '--- [ Mark Task Completed ] ---', type: 'header' },
            { text: `Enter Task ID: ${pending.id}`, type: 'stdout' },
            { text: `[SUCCESS] Task #${pending.id} ('${pending.title}') marked as COMPLETED!`, type: 'success' },
            { text: 'Enter your choice (1-7): ', type: 'stdout' }
          ]);
        } else {
          addLines([
            { text: `> 4`, type: 'command' },
            { text: '[INFO] All tasks are already completed!', type: 'info' },
            { text: 'Enter your choice (1-7): ', type: 'stdout' }
          ]);
        }
        break;
      }

      case '5': {
        // Delete task
        if (tasks.length > 0) {
          const target = tasks[tasks.length - 1];
          onDeleteTask(target.id);
          addLines([
            { text: `> 5`, type: 'command' },
            { text: '--- [ Delete Task ] ---', type: 'header' },
            { text: `Enter Task ID to delete: ${target.id}`, type: 'stdout' },
            { text: `Target: #${target.id} - ${target.title} (${target.courseCode})`, type: 'dim' },
            { text: 'Are you sure you want to delete this task? (y/n): y', type: 'stdout' },
            { text: `[SUCCESS] Task #${target.id} deleted successfully.`, type: 'success' },
            { text: 'Enter your choice (1-7): ', type: 'stdout' }
          ]);
        } else {
          addLines([
            { text: `> 5`, type: 'command' },
            { text: '[ERROR] Task list is empty. Nothing to delete.', type: 'error' },
            { text: 'Enter your choice (1-7): ', type: 'stdout' }
          ]);
        }
        break;
      }

      case '6': {
        // Show Statistics
        const total = tasks.length;
        const completed = tasks.filter(t => t.isCompleted).length;
        const pending = total - completed;
        const rate = total > 0 ? ((completed / total) * 100).toFixed(1) : '0.0';
        const assignments = tasks.filter(t => t.type === 'Assignment');
        const exams = tasks.filter(t => t.type === 'Exam Task');

        addLines([
          { text: `> 6`, type: 'command' },
          { text: '========================================', type: 'header' },
          { text: '           TASK STATISTICS', type: 'header' },
          { text: '========================================', type: 'header' },
          { text: `  Total Tasks Recorded    : ${total}`, type: 'stdout' },
          { text: `  Completed Tasks         : ${completed}`, type: 'stdout' },
          { text: `  Pending Tasks           : ${pending}`, type: 'stdout' },
          { text: `  Overall Completion Rate : ${rate}%`, type: 'info' },
          { text: '----------------------------------------', type: 'dim' },
          { text: '  Category Breakdown:', type: 'stdout' },
          { text: `    • Assignments        : ${assignments.length} (Completed: ${assignments.filter(a => a.isCompleted).length}, Pending: ${assignments.filter(a => !a.isCompleted).length})`, type: 'stdout' },
          { text: `    • Exam Milestones    : ${exams.length} (Completed: ${exams.filter(e => e.isCompleted).length}, Pending: ${exams.filter(e => !e.isCompleted).length})`, type: 'stdout' },
          { text: '========================================', type: 'header' },
          { text: 'Enter your choice (1-7): ', type: 'stdout' }
        ]);
        break;
      }

      case '7': {
        onSaveTasks();
        addLines([
          { text: `> 7`, type: 'command' },
          { text: 'Saving tasks to data/tasks.txt...', type: 'stdout' },
          { text: `[SUCCESS] ${tasks.length} task(s) saved to data/tasks.txt successfully.`, type: 'success' },
          { text: 'Thank you for using Student Task & Assignment Manager.', type: 'info' },
          { text: 'Good luck with your academic semester!', type: 'info' },
          { text: '$ java -cp out Main terminated with exit code 0.', type: 'dim' }
        ]);
        break;
      }

      case 'clear': {
        setLines([]);
        break;
      }

      case 'help': {
        addLines([
          { text: '> help', type: 'command' },
          { text: 'Available commands:', type: 'info' },
          { text: '  1 - Add new task (Assignment or Exam Task)', type: 'stdout' },
          { text: '  2 - View all tasks in formatted ASCII table', type: 'stdout' },
          { text: '  3 - Search task by keyword', type: 'stdout' },
          { text: '  4 - Mark task completed', type: 'stdout' },
          { text: '  5 - Delete task by ID', type: 'stdout' },
          { text: '  6 - Show statistical completion breakdown', type: 'stdout' },
          { text: '  7 - Save state to data/tasks.txt & exit', type: 'stdout' },
          { text: '  clear - Clear terminal screen', type: 'stdout' },
          { text: '  javac - Recompile all 7 Java source files', type: 'stdout' },
          { text: '  run   - Launch Main menu loop', type: 'stdout' }
        ]);
        break;
      }

      case 'javac':
      case 'build': {
        addLines([
          { text: '$ javac -d out src/*.java', type: 'command' },
          { text: '[INFO] Compiling 7 Java source files with javac (OpenJDK 17.0.20)...', type: 'info' },
          { text: '  • Main.java -> out/Main.class', type: 'dim' },
          { text: '  • Task.java -> out/Task.class', type: 'dim' },
          { text: '  • Assignment.java -> out/Assignment.class', type: 'dim' },
          { text: '  • ExamTask.java -> out/ExamTask.class', type: 'dim' },
          { text: '  • TaskManager.java -> out/TaskManager.class', type: 'dim' },
          { text: '  • FileManager.java -> out/FileManager.class', type: 'dim' },
          { text: '  • InvalidTaskException.java -> out/InvalidTaskException.class', type: 'dim' },
          { text: '[SUCCESS] Compilation clean: 0 errors, 0 warnings.', type: 'success' }
        ]);
        break;
      }

      case 'run': {
        addLines([
          { text: '$ java -cp out Main', type: 'command' },
          { text: 'Initializing Student Task & Assignment Manager...', type: 'info' },
          { text: `[INFO] Successfully loaded ${tasks.length} existing task(s) from data/tasks.txt`, type: 'info' },
          { text: '========================================', type: 'header' },
          { text: '       STUDENT TASK MANAGER', type: 'header' },
          { text: '========================================', type: 'header' },
          { text: '1. Add Task', type: 'stdout' },
          { text: '2. View Tasks', type: 'stdout' },
          { text: '3. Search Task', type: 'stdout' },
          { text: '4. Mark Task Completed', type: 'stdout' },
          { text: '5. Delete Task', type: 'stdout' },
          { text: '6. Show Statistics', type: 'stdout' },
          { text: '7. Save & Exit', type: 'stdout' },
          { text: '========================================', type: 'header' },
          { text: 'Enter your choice (1-7): ', type: 'stdout' }
        ]);
        break;
      }

      default: {
        addLines([
          { text: `> ${choice}`, type: 'command' },
          { text: `[ERROR] Invalid choice! Please enter a number between 1 and 7, or type 'help'.`, type: 'error' },
          { text: 'Enter your choice (1-7): ', type: 'stdout' }
        ]);
        break;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      handleMenuOption(inputVal);
      setInputVal('');
    }
  };

  return (
    <section 
      style={{ height: `${terminalHeight}px` }} 
      className="terminal flex flex-col shrink-0 select-text transition-all duration-200"
      id="sleek-terminal"
    >
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between mb-2 text-xs opacity-75 border-b border-[#30363D] pb-1.5 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-[#58A6FF]" />
          <span className="font-semibold tracking-wide text-[#C9D1D9]">TERMINAL (zsh) — Java SE 17.0.20</span>
          <span className="text-[#8B949E] text-[11px] hidden sm:inline">| CSE2006</span>
        </div>

        <div className="flex items-center gap-2 text-[#8B949E]">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-1 mr-2 text-[11px]">
            <button 
              onClick={() => handleMenuOption('2')} 
              className="px-2 py-0.5 rounded bg-[#161B22] hover:bg-[#21262D] text-[#58A6FF] border border-[#30363D] transition-colors"
            >
              [2] View Tasks
            </button>
            <button 
              onClick={() => handleMenuOption('1')} 
              className="px-2 py-0.5 rounded bg-[#161B22] hover:bg-[#21262D] text-[#7EE787] border border-[#30363D] transition-colors"
            >
              [1] Add Task
            </button>
            <button 
              onClick={() => handleMenuOption('6')} 
              className="px-2 py-0.5 rounded bg-[#161B22] hover:bg-[#21262D] text-[#FFA657] border border-[#30363D] transition-colors"
            >
              [6] Statistics
            </button>
            <button 
              onClick={() => handleMenuOption('4')} 
              className="px-2 py-0.5 rounded bg-[#161B22] hover:bg-[#21262D] text-[#D2A8FF] border border-[#30363D] transition-colors"
            >
              [4] Complete
            </button>
            <button 
              onClick={() => handleMenuOption('7')} 
              className="px-2 py-0.5 rounded bg-[#161B22] hover:bg-[#21262D] text-[#8B949E] border border-[#30363D] transition-colors"
            >
              [7] Save
            </button>
          </div>

          <button 
            onClick={() => setLines([])}
            title="Clear Terminal"
            className="hover:text-[#C9D1D9] p-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={onToggleHeight}
            title="Toggle Height"
            className="hover:text-[#C9D1D9] p-1 transition-colors"
          >
            {terminalHeight > 300 ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <span>{currentTime || '10:24 AM'}</span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto space-y-0.5 font-mono text-xs pr-2 leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map(line => {
          let colorClass = 'text-[#C9D1D9]';
          if (line.type === 'command') colorClass = 'text-[#7EE787] font-medium';
          else if (line.type === 'info') colorClass = 'text-[#58A6FF]';
          else if (line.type === 'success') colorClass = 'text-[#2EA043] font-semibold';
          else if (line.type === 'error') colorClass = 'text-[#F85149] font-medium';
          else if (line.type === 'header') colorClass = 'text-[#E6EDF3] font-semibold';
          else if (line.type === 'dim') colorClass = 'text-[#8B949E]';

          return (
            <div key={line.id} className={`${colorClass} whitespace-pre-wrap break-all`}>
              {line.text}
            </div>
          );
        })}

        {/* Active Input Line */}
        <div className="flex items-center gap-1.5 pt-1 text-[#C9D1D9]">
          <span className="text-[#7EE787] font-semibold">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type choice (1-7), 'clear', or 'javac'..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#E6EDF3] placeholder-[#8B949E]/50"
            autoFocus
          />
          <span className="animate-pulse inline-block w-2 h-4 bg-[#8B949E] align-middle shrink-0" />
        </div>
      </div>
    </section>
  );
};
