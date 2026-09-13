# Project Statement: Student Task & Assignment Manager

**Course**: CSE2006 – Programming in Java  
**Project Track**: VITyarthi - Build Your Own Project (Flipped Course Evaluation)  
**Author**: Venkatesh Shelke  
**Academic Year**: 2025–2026  

---

## 1. Problem Statement
Undergraduate engineering students frequently face significant cognitive overload due to fragmented academic deadlines across lectures, laboratory practicals, Continuous Assessment Tests (CAT-1 & CAT-2), Final Assessment Tests (FAT), and continuous project reviews. Currently, students encounter several critical operational issues:
- **Scattered Information**: Assignment deadlines, test schedules, and project milestones are distributed across multiple LMS platforms (Moodle, Canvas, V-TOP) and messaging channels without a unified local ledger.
- **Category Ambiguity**: Existing generic todo apps do not distinguish between graded coursework deliverables (which require submission platform tracking, subject names, and maximum marks) and examination milestones (which require syllabus coverage, exam duration, and grade weightage percentage).
- **Network Dependency & Bloat**: Most commercial task apps are heavy, subscription-gated web apps that consume significant system resources and fail to function offline during coding or exam preparation.
- **Lack of Local Persistence**: Simple student script solutions often lose task status upon program exit, causing data loss.

To solve this, the **Student Task & Assignment Manager** provides a reliable, object-oriented, self-contained, and persistent software system built in Java SE with an accompanying modern interactive dashboard, allowing students to effortlessly organize, monitor, and complete coursework and assessment deliverables.

---

## 2. Scope of the Project

### In-Scope:
- **Polymorphic Domain Modeling**: Specialized data modeling for Coursework Assignments and Examination Milestones inheriting from a unified abstract `Task` parent.
- **Complete CRUD Lifecycle**: Adding, listing, detailed viewing, updating completion status, and deleting academic tasks.
- **Multi-Attribute Search & Filter**: Real-time keyword filtering across task titles, course codes, assessment categories, subjects, and syllabus modules.
- **Deterministic File Storage**: Bidirectional file I/O serialization using character streams (`BufferedReader`/`PrintWriter`) persisting all records to a flat-file database (`data/tasks.txt`).
- **Academic Progress & Analytics**: Real-time aggregation of pending tasks, completed deliverables, exam weightage percentage, and visual urgency badges (Overdue, Due Today, Upcoming).
- **Gamification & Reward System**: Instant celebration effects (screen confetti, harmonic Web Audio chimes), XP progression (+50 XP for assignments, +100 XP for exams), academic level advancement (Levels 1–5), and achievement badges (First Step, High Velocity, Exam Conqueror, Master Mind, Grand Perfectionist).
- **Dual Runtime Interface**:
  1. Standard Java SE Terminal Console application (`Main.java`).
  2. High-performance, reactive browser dashboard (Vite + React + TypeScript + Tailwind CSS).

### Out-of-Scope (Future Enhancements):
- Direct REST API integration with proprietary university LMS APIs (e.g., automated scraping of V-TOP credentials).
- Multi-user remote synchronization over public cloud servers.

---

## 3. Target Users
The primary target users are:
1. **Undergraduate & Postgraduate Engineering Students**: Students enrolled in intensive engineering curricula (such as CSE, ECE, IT) handling concurrent theory and lab courses.
2. **University Faculty & Course Instructors**: Evaluating student submissions and monitoring milestone completion.
3. **Academic Mentors & Study Groups**: Students coordinating preparation for shared semester exams (CAT-1, CAT-2, FAT) and technical lab assignments.

---

## 4. High-Level Features

| Feature Module | Description | Technical Implementation |
| :--- | :--- | :--- |
| **1. Coursework & Exam Tracking** | Create and categorize tasks into either Coursework Assignments (subject, marks, submission portal) or Examination Milestones (CAT/FAT/Quiz, syllabus, duration, grade weightage). | Polymorphic inheritance (`Assignment extends Task`, `ExamTask extends Task`). |
| **2. Persistent Storage (File I/O)** | Automatic save and reload of all task entities across program executions without database server overhead. | Java Character Streams (`FileReader`, `FileWriter`, `BufferedReader`, `BufferedWriter`) in `data/tasks.txt`. |
| **3. Search, Filter & Inspection** | Instant query matching across ID, title, course code, and syllabus topics with deep inspect modal. | Java Collections Framework (`ArrayList<Task>`, iterative stream filtering). |
| **4. Exception Handling & Data Integrity** | Strict validation to reject empty titles, negative marks, invalid durations, or out-of-range weightages. | Custom checked exception (`InvalidTaskException`) with `try-catch-finally` blocks. |
| **5. Academic Progress Analytics** | Live dashboard metrics showing total tasks, completion percentage, pending counts, and total exam weightage coverage. | Real-time aggregation logic and mathematical summary counters. |
| **6. Academic Rewards & Celebrations** | Immediate positive reinforcement upon task completion with sound fanfare, confetti animation, XP gains, streak counters, and honor badges. | Canvas-confetti engine, Web Audio API frequency synthesis, and local storage state persistence. |
| **7. Dual Mode Execution** | Run directly in terminal via `javac`/`java` for minimal resource footprint or launch in browser for visual dashboard. | Java SE CLI runtime + Vite React frontend. |
