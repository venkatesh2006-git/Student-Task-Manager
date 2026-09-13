export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  extension: 'java' | 'txt' | 'md' | 'gitignore';
  content: string;
  description?: string;
  category: 'src' | 'data' | 'report' | 'root';
}

export interface TaskRecord {
  id: number;
  type: 'Assignment' | 'Exam Task';
  title: string;
  courseCode: string;
  dueDate: string;
  isCompleted: boolean;
  // Assignment specific
  subject?: string;
  maxMarks?: number;
  submissionPlatform?: string;
  // ExamTask specific
  examType?: string;
  syllabusTopics?: string;
  durationMinutes?: number;
  weightagePercentage?: number;
}

export interface TerminalLine {
  id: string;
  text: string;
  type: 'command' | 'stdout' | 'info' | 'success' | 'error' | 'header' | 'dim';
}
