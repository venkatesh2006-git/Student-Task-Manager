import React, { useState } from 'react';
import { ProjectFile, TaskRecord } from '../types';
import { PROJECT_FILES } from '../data/projectFiles';
import { FileTree } from './FileTree';
import { CodeViewer } from './CodeViewer';
import { Terminal } from './Terminal';
import { X, ExternalLink, Terminal as TerminalIcon } from 'lucide-react';

interface JavaConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskRecord[];
  onAddTask: (task: Omit<TaskRecord, 'id'>) => void;
  onMarkCompleted: (id: number) => boolean;
  onDeleteTask: (id: number) => boolean;
  onSaveTasks: () => void;
}

export const JavaConsoleModal: React.FC<JavaConsoleModalProps> = ({
  isOpen,
  onClose,
  tasks,
  onAddTask,
  onMarkCompleted,
  onDeleteTask,
  onSaveTasks
}) => {
  const [files] = useState<ProjectFile[]>(PROJECT_FILES);
  const [activeFile, setActiveFile] = useState<ProjectFile>(files[0]);
  const [openFiles, setOpenFiles] = useState<ProjectFile[]>([files[0], files[1], files[3]]);
  const [terminalHeight, setTerminalHeight] = useState<number>(240);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectFile = (file: ProjectFile) => {
    setActiveFile(file);
    if (!openFiles.some(f => f.id === file.id)) {
      setOpenFiles(prev => [...prev, file]);
    }
  };

  const handleCloseTab = (fileId: string) => {
    if (openFiles.length <= 1) return;
    const remaining = openFiles.filter(f => f.id !== fileId);
    setOpenFiles(remaining);
    if (activeFile.id === fileId) {
      setActiveFile(remaining[remaining.length - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4">
      <div 
        className="bg-[#0E1117] border border-[#30363D] rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
        id="java-console-modal"
      >
        {/* Modal Top Header */}
        <div className="px-4 py-2.5 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-[#58A6FF]" />
            <span className="text-xs sm:text-sm font-semibold text-[#C9D1D9]">
              Java SE 17 Project Environment & Terminal Runner
            </span>
            <span className="text-[10px] bg-[#238636]/20 text-[#238636] border border-[#238636]/40 px-2 py-0.5 rounded-full font-mono font-medium hidden sm:inline-block">
              Coursework CSE2006
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Body: Left File Tree + Center Editor & Terminal */}
        <div className="flex-1 flex flex-row overflow-hidden">
          {/* File Tree */}
          <div className="w-56 sm:w-64 border-r border-[#30363D] shrink-0 hidden md:block">
            <FileTree
              files={files}
              activeFileId={activeFile.id}
              onSelectFile={handleSelectFile}
            />
          </div>

          {/* Right Area: Code Viewer + Terminal */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <CodeViewer
              file={activeFile}
              openFiles={openFiles}
              onSelectTab={(f) => setActiveFile(f)}
              onCloseTab={handleCloseTab}
              onRunBuild={() => {
                setIsBuilding(true);
                setTimeout(() => setIsBuilding(false), 500);
              }}
              onRunApp={() => {}}
            />

            <Terminal
              tasks={tasks}
              onAddTask={onAddTask}
              onMarkCompleted={onMarkCompleted}
              onDeleteTask={onDeleteTask}
              onSaveTasks={onSaveTasks}
              onResetTasks={() => {}}
              isBuilding={isBuilding}
              terminalHeight={terminalHeight}
              onToggleHeight={() => setTerminalHeight(prev => prev > 260 ? 160 : 320)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
