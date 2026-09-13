import React, { useMemo, useState } from 'react';
import { ProjectFile } from '../types';
import { Check, Copy, Play, Cpu, Sparkles } from 'lucide-react';

interface CodeViewerProps {
  file: ProjectFile;
  openFiles: ProjectFile[];
  onSelectTab: (file: ProjectFile) => void;
  onCloseTab: (fileId: string) => void;
  onRunBuild: () => void;
  onRunApp: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  file,
  openFiles,
  onSelectTab,
  onCloseTab,
  onRunBuild,
  onRunApp
}) => {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => {
    return file.content.split('\n');
  }, [file.content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Tokenizes and highlights a line of code according to the Sleek Interface color tokens
   */
  const renderLine = (line: string) => {
    if (file.extension === 'txt') {
      if (line.startsWith('#')) {
        return <span className="token-comment">{line}</span>;
      }
      if (line.startsWith('ASSIGNMENT')) {
        return (
          <span>
            <span className="token-keyword font-semibold">ASSIGNMENT</span>
            <span className="text-[#C9D1D9]">{line.substring(10)}</span>
          </span>
        );
      }
      if (line.startsWith('EXAM')) {
        return (
          <span>
            <span className="token-class font-semibold">EXAM</span>
            <span className="text-[#C9D1D9]">{line.substring(4)}</span>
          </span>
        );
      }
      return <span>{line}</span>;
    }

    if (file.extension === 'md') {
      if (line.startsWith('#')) {
        return <span className="text-[#FFA657] font-semibold">{line}</span>;
      }
      if (line.startsWith('```') || line.startsWith('>')) {
        return <span className="token-comment">{line}</span>;
      }
      if (line.startsWith('-') || line.startsWith('*')) {
        return <span className="text-[#58A6FF]">{line}</span>;
      }
      return <span>{line}</span>;
    }

    // Java syntax highlighting
    const trimmed = line.trim();

    // Comment lines
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return <span className="token-comment">{line}</span>;
    }

    // Tokenize words, strings, annotations, symbols
    const tokens = line.split(/(".*?"|'.*?'|\/\*.*?\*\/|\/\/.*$|\b[A-Za-z_][A-Za-z0-9_]*\b|@\w+|[0-9]+(?:\.[0-9]+)?)/g);

    return (
      <span>
        {tokens.map((token, index) => {
          if (!token) return null;

          // Strings
          if (token.startsWith('"') || token.startsWith("'")) {
            return <span key={index} className="token-string">{token}</span>;
          }

          // In-line comments
          if (token.startsWith('//') || token.startsWith('/*')) {
            return <span key={index} className="token-comment">{token}</span>;
          }

          // Annotations
          if (token.startsWith('@')) {
            return <span key={index} className="token-annotation">{token}</span>;
          }

          // Numbers
          if (/^[0-9]+(\.[0-9]+)?$/.test(token)) {
            return <span key={index} className="token-number">{token}</span>;
          }

          // Java Keywords
          const keywords = [
            'public', 'private', 'protected', 'class', 'extends', 'implements',
            'abstract', 'final', 'static', 'void', 'return', 'new', 'this', 'super',
            'if', 'else', 'switch', 'case', 'break', 'default', 'while', 'for',
            'try', 'catch', 'finally', 'throw', 'throws', 'import', 'package',
            'instanceof', 'true', 'false', 'null', 'int', 'double', 'boolean', 'char', 'long'
          ];
          if (keywords.includes(token)) {
            return <span key={index} className="token-keyword">{token}</span>;
          }

          // Class types
          const classes = [
            'Task', 'Assignment', 'ExamTask', 'TaskManager', 'FileManager', 
            'InvalidTaskException', 'String', 'Scanner', 'ArrayList', 'List',
            'Exception', 'Throwable', 'System', 'Main', 'File', 'FileReader',
            'FileWriter', 'BufferedReader', 'BufferedWriter', 'IOException',
            'NumberFormatException', 'Boolean', 'Double', 'Integer'
          ];
          if (classes.includes(token)) {
            return <span key={index} className="token-class">{token}</span>;
          }

          return <span key={index}>{token}</span>;
        })}
      </span>
    );
  };

  return (
    <main className="code-area flex-1 flex flex-col h-full overflow-hidden" id="code-viewer-container">
      {/* File Tabs Strip */}
      <div className="flex items-center bg-[#161B22] border-b border-[#30363D] overflow-x-auto select-none no-scrollbar">
        {openFiles.map(f => {
          const isActive = f.id === file.id;
          return (
            <div
              key={f.id}
              onClick={() => onSelectTab(f)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-mono cursor-pointer border-r border-[#30363D] transition-colors ${
                isActive
                  ? 'bg-[#0E1117] text-[#C9D1D9] border-t-2 border-t-[#58A6FF] font-medium'
                  : 'text-[#8B949E] hover:bg-[#1C2128] hover:text-[#C9D1D9]'
              }`}
            >
              <span>{f.name}</span>
              {openFiles.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(f.id);
                  }}
                  className="hover:text-white rounded px-1 opacity-70 hover:opacity-100"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Header matching Sleek Interface Design */}
      <header className="glass px-4 py-2.5 flex items-center justify-between h-14 border-b border-[#30363D] z-10 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold tracking-tight text-[#C9D1D9] flex items-center gap-2 font-mono">
            <span>{file.name}</span>
            <span className="text-xs text-[#8B949E] font-sans font-normal">— StudentTaskManager</span>
          </h1>
          <span className="text-xs text-[#8B949E] hidden sm:inline-block">
            {lines.length} lines • {file.extension.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy Source Code"
            className="flex items-center gap-1.5 bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] px-2.5 py-1 rounded text-xs font-medium border border-[#30363D] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#238636]" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={onRunBuild}
            title="Compile Java sources via javac"
            className="flex items-center gap-1.5 bg-[#238636] hover:bg-[#2EA043] text-white px-3 py-1 rounded text-xs font-medium transition-colors shadow-sm"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Run Build</span>
          </button>

          <button
            onClick={onRunApp}
            title="Run Main class in interactive terminal"
            className="flex items-center gap-1.5 bg-[#1F6FEB] hover:bg-[#388BFD] text-white px-3 py-1 rounded text-xs font-medium transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Run Console App</span>
          </button>
        </div>
      </header>

      {/* Code Text Viewer */}
      <div className="flex-1 overflow-auto flex font-mono text-xs md:text-sm leading-relaxed pt-2 pb-4 bg-[#0E1117]">
        {/* Line Numbers */}
        <div className="line-num py-1 select-none">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 pr-6 py-1 overflow-x-auto whitespace-pre">
          {lines.map((line, i) => (
            <div key={i} className="hover:bg-[#161B22]/50 px-1 rounded-sm">
              {renderLine(line)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
