import React, { useState } from 'react';
import { ProjectFile } from '../types';
import { 
  ChevronDown, 
  ChevronRight, 
  FileCode, 
  FileText, 
  Database, 
  Folder, 
  FolderOpen,
  Plus,
  Terminal as TerminalIcon
} from 'lucide-react';

interface FileTreeProps {
  files: ProjectFile[];
  activeFileId: string;
  onSelectFile: (file: ProjectFile) => void;
  onNewTaskClick?: () => void;
  onRunTerminalClick?: () => void;
}

export const FileTree: React.FC<FileTreeProps> = ({
  files,
  activeFileId,
  onSelectFile,
  onNewTaskClick,
  onRunTerminalClick
}) => {
  const [srcOpen, setSrcOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(true);
  const [reportOpen, setReportOpen] = useState(true);

  const getFileIcon = (file: ProjectFile) => {
    switch (file.extension) {
      case 'java':
        return <FileCode className="w-4 h-4 text-[#FFA657]" />;
      case 'txt':
        return <Database className="w-4 h-4 text-[#58A6FF]" />;
      case 'md':
        return <FileText className="w-4 h-4 text-[#7EE787]" />;
      default:
        return <FileCode className="w-4 h-4 text-[#8B949E]" />;
    }
  };

  const srcFiles = files.filter(f => f.category === 'src');
  const dataFiles = files.filter(f => f.category === 'data');
  const reportFiles = files.filter(f => f.category === 'report');
  const rootFiles = files.filter(f => f.category === 'root');

  return (
    <aside className="file-tree flex flex-col h-full select-none" id="project-file-explorer">
      {/* Explorer Header */}
      <div className="p-4 border-b border-[#30363D] flex items-center justify-between">
        <span className="font-bold text-xs uppercase tracking-widest text-[#8B949E]">Explorer</span>
        <div className="flex items-center gap-1">
          {onNewTaskClick && (
            <button 
              onClick={onNewTaskClick}
              title="Add New Academic Task"
              className="p-1 hover:bg-[#30363D]/60 rounded text-[#58A6FF] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
          {onRunTerminalClick && (
            <button 
              onClick={onRunTerminalClick}
              title="Open Terminal Runner"
              className="p-1 hover:bg-[#30363D]/60 rounded text-[#238636] transition-colors"
            >
              <TerminalIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* File Tree List */}
      <div className="p-2 flex-1 space-y-1 text-sm overflow-y-auto font-mono text-xs">
        {/* Project Root Folder */}
        <div className="flex items-center gap-1.5 p-1 text-[#C9D1D9] font-medium opacity-90">
          <ChevronDown className="w-3.5 h-3.5 text-[#8B949E]" />
          <FolderOpen className="w-4 h-4 text-[#58A6FF]" />
          <span className="tracking-tight font-semibold">StudentTaskManager</span>
        </div>

        <div className="pl-4 space-y-1">
          {/* src folder */}
          <div>
            <div 
              onClick={() => setSrcOpen(!srcOpen)}
              className="flex items-center gap-1.5 p-1 text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer transition-colors"
            >
              {srcOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              {srcOpen ? <FolderOpen className="w-3.5 h-3.5 text-[#D29922]" /> : <Folder className="w-3.5 h-3.5 text-[#D29922]" />}
              <span className="font-medium">src</span>
              <span className="text-[10px] text-[#8B949E]/70 ml-auto">({srcFiles.length})</span>
            </div>

            {srcOpen && (
              <div className="pl-5 space-y-0.5 mt-0.5">
                {srcFiles.map(file => {
                  const isActive = file.id === activeFileId;
                  return (
                    <div
                      key={file.id}
                      onClick={() => onSelectFile(file)}
                      className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-all ${
                        isActive
                          ? 'bg-[#58A6FF]/15 text-[#58A6FF] font-medium border-l-2 border-[#58A6FF]'
                          : 'text-[#C9D1D9] hover:bg-[#1F242C] hover:text-white'
                      }`}
                    >
                      {getFileIcon(file)}
                      <span className="truncate">{file.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* data folder */}
          <div>
            <div 
              onClick={() => setDataOpen(!dataOpen)}
              className="flex items-center gap-1.5 p-1 text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer transition-colors"
            >
              {dataOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              {dataOpen ? <FolderOpen className="w-3.5 h-3.5 text-[#58A6FF]" /> : <Folder className="w-3.5 h-3.5 text-[#58A6FF]" />}
              <span className="font-medium">data</span>
            </div>

            {dataOpen && (
              <div className="pl-5 space-y-0.5 mt-0.5">
                {dataFiles.map(file => {
                  const isActive = file.id === activeFileId;
                  return (
                    <div
                      key={file.id}
                      onClick={() => onSelectFile(file)}
                      className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-all ${
                        isActive
                          ? 'bg-[#58A6FF]/15 text-[#58A6FF] font-medium border-l-2 border-[#58A6FF]'
                          : 'text-[#C9D1D9] hover:bg-[#1F242C] hover:text-white'
                      }`}
                    >
                      {getFileIcon(file)}
                      <span className="truncate">{file.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* report folder */}
          <div>
            <div 
              onClick={() => setReportOpen(!reportOpen)}
              className="flex items-center gap-1.5 p-1 text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer transition-colors"
            >
              {reportOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              {reportOpen ? <FolderOpen className="w-3.5 h-3.5 text-[#7EE787]" /> : <Folder className="w-3.5 h-3.5 text-[#7EE787]" />}
              <span className="font-medium">report</span>
            </div>

            {reportOpen && (
              <div className="pl-5 space-y-0.5 mt-0.5">
                {reportFiles.map(file => {
                  const isActive = file.id === activeFileId;
                  return (
                    <div
                      key={file.id}
                      onClick={() => onSelectFile(file)}
                      className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-all ${
                        isActive
                          ? 'bg-[#58A6FF]/15 text-[#58A6FF] font-medium border-l-2 border-[#58A6FF]'
                          : 'text-[#C9D1D9] hover:bg-[#1F242C] hover:text-white'
                      }`}
                    >
                      {getFileIcon(file)}
                      <span className="truncate">{file.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* root files */}
          <div className="pt-1 space-y-0.5">
            {rootFiles.map(file => {
              const isActive = file.id === activeFileId;
              return (
                <div
                  key={file.id}
                  onClick={() => onSelectFile(file)}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#58A6FF]/15 text-[#58A6FF] font-medium border-l-2 border-[#58A6FF]'
                      : 'text-[#C9D1D9] hover:bg-[#1F242C] hover:text-white'
                  }`}
                >
                  {getFileIcon(file)}
                  <span className="truncate">{file.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Badges */}
      <div className="p-4 border-t border-[#30363D] bg-[#161B22]">
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-[#238636]/15 text-[#238636] border-[#238636]/30 font-mono font-medium">JDK 17</span>
          <span className="badge bg-[#58A6FF]/15 text-[#58A6FF] border-[#58A6FF]/30 font-mono font-medium">CSE2006</span>
          <span className="badge bg-[#D29922]/15 text-[#D29922] border-[#D29922]/30 font-mono font-medium">Java SE</span>
        </div>
        <div className="mt-2 text-[11px] text-[#8B949E] truncate">
          Status: Ready to compile
        </div>
      </div>
    </aside>
  );
};
