# Student Task & Assignment Manager

> **Course Code**: CSE2006 – Programming in Java  
> **Course Type**: Embedded Lab / Project-Based Learning (LP)  
> **Evaluation**: VITyarthi - Build Your Own Project (Flipped Course Evaluation)  
> **Developer**: Venkatesh Shelke  
> **Academic Session**: 2025–2026  

---

## 1. Project Title
**Student Task & Assignment Manager: An Object-Oriented Academic Coursework & Examination Tracker**

---

## 2. Overview of the Project
The **Student Task & Assignment Manager** is a specialized academic productivity platform engineered to resolve deadline fragmentation and cognitive overload for university engineering students. 

Built around core **Java SE Object-Oriented Programming** principles and paired with a modern interactive dashboard, the system allows students to manage two distinct categories of academic work:
1. **Coursework Assignments**: Regular submissions, laboratory observation journals, coding assessments, and semester project reviews.
2. **Examination Milestones**: Continuous Assessment Tests (CAT-1, CAT-2), Term-End Examinations (FAT), and surprise quizzes with syllabus tracking and weightage calculation.

The project implements an extensible class hierarchy with dynamic method dispatch, custom checked exceptions (`InvalidTaskException`), persistent bidirectional file I/O streaming (`data/tasks.txt`), real-time search, and a positive-reinforcement gamified reward system with XP progression and academic honor badges.

---

## 3. Key Features

### 📚 Academic Task Specialization
- **Polymorphic Architecture**: Base abstract class `Task` extended by `Assignment` (with subject, max marks, submission platform) and `ExamTask` (with exam type, syllabus modules, duration, and grade weightage %).
- **Urgency Intelligence**: Automatic status calculation tagging tasks as **Overdue**, **Due Today**, or **Upcoming**.

### 💾 Robust Flat-File Persistence (Java File I/O)
- Saves and retrieves tasks in `data/tasks.txt` using pipe-delimited format (`ASSIGNMENT|...` or `EXAM|...`).
- Automatic ID tracking across program sessions to ensure persistent identity.

### 🛡️ Defensive Input Validation & Custom Exceptions
- Rejects blank titles, missing course codes, negative marks, negative durations, or invalid grade weightages using custom `InvalidTaskException`.
- Clean error recovery with user-friendly warnings.

### 📊 Academic Analytics & Grade Impact
- Live counters for Total Tasks, Completed Tasks, and Pending Tasks.
- Dedicated **Exam Weightage Tracker** accumulating total percentage contribution towards final semester grades.

### 🏆 Academic Gamification & Rewards
- **Celebration Fireworks**: Confetti effects on task completion with a Grand Celebration when 100% of tasks are cleared.
- **Harmonic Audio Chime**: Synthesizes a four-tone victory fanfare using the browser Web Audio API with one-click mute/unmute.
- **XP & Level Progression**: +50 XP for coursework assignments, +100 XP for exam milestones; levels from Level 1 (*Novice Scholar*) to Level 5 (*Dean's List Legend*).
- **Honor Badges**: Unlockable achievements (*First Step*, *High Velocity*, *Exam Conqueror*, *Master Mind*, *Grand Perfectionist*).

---

## 4. Technologies & Tools Used

| Domain | Technology / Tool | Version / Spec | Usage |
| :--- | :--- | :--- | :--- |
| **Core Language** | **Java SE** | OpenJDK 17+ | Core object-oriented business logic, file I/O, and data validation |
| **Java Libraries** | Standard Library | `java.util.*`, `java.io.*` | Collections (`ArrayList`), streams (`BufferedReader`, `PrintWriter`) |
| **Frontend UI** | **React 18** | React + TypeScript | Interactive student dashboard & modal interfaces |
| **Build Tool** | **Vite** | 5.x | High-speed local development server & bundler |
| **Styling** | **Tailwind CSS** | 3.4.x | Responsive modern dark layout and components |
| **Icons** | **Lucide React** | Latest | Academic iconography (GraduationCap, BookOpen, Trophy, etc.) |
| **Celebrations** | **canvas-confetti** | Latest | Particle physics celebration engine |
| **Audio** | **Web Audio API** | Native Browser | Chime sound synthesizer |

---

## 5. Directory Structure

```
├── StudentTaskManager/
│   ├── src/
│   │   ├── Task.java                 # Abstract base class (Encapsulation, Polymorphism)
│   │   ├── Assignment.java           # Subclass for coursework assignments
│   │   ├── ExamTask.java             # Subclass for examination milestones
│   │   ├── TaskManager.java          # Business logic & collection manager
│   │   ├── FileManager.java          # Persistent stream I/O handler
│   │   ├── InvalidTaskException.java # Custom checked exception
│   │   └── Main.java                 # Command-line menu application
│   ├── data/
│   │   └── tasks.txt                 # Persistent flat-file database
│   ├── statement.md                  # Problem statement & scope specification
│   └── README.md                     # Java project documentation
├── src/                              # Modern Web Interactive Dashboard
│   ├── components/                   # Modular UI components (Cards, Modals, Banner)
│   ├── utils/rewardSystem.ts         # XP calculation, audio chime, and badges engine
│   ├── App.tsx                       # Main reactive application controller
│   └── types.ts                      # TypeScript domain definitions
├── data/tasks.txt                    # Synchronized data store
├── report/
│   └── PROJECT_REPORT.md             # Complete 15-section academic report
├── statement.md                      # VITyarthi submission requirement
└── README.md                         # Main repository guide
```

---

## 6. Steps to Install & Run the Project

### Prerequisites
- **Java Development Kit (JDK)**: Version 11 or higher (OpenJDK 17 recommended).
- **Node.js**: Version 18 or higher (with `npm`).

---

### Option A: Running the Core Java Application (Terminal CLI)

1. Open your terminal and navigate to the Java project folder:
   ```bash
   cd StudentTaskManager/src
   ```

2. Compile all Java source files:
   ```bash
   javac *.java
   ```

3. Execute the application:
   ```bash
   java Main
   ```

4. You will be greeted with the interactive menu:
   ```text
   ==================================================
        STUDENT TASK & ASSIGNMENT MANAGER (CSE2006)
   ==================================================
   [1] Add New Assignment
   [2] Add New Examination Task
   [3] View All Academic Tasks
   [4] Search Task by Keyword
   [5] Toggle Task Completion Status
   [6] Delete Task
   [7] Display Academic Statistics
   [8] Save & Exit
   ==================================================
   Enter your choice (1-8):
   ```

---

### Option B: Running the Web Application (Interactive Dashboard)

1. Navigate to the project root directory:
   ```bash
   cd /
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 7. Instructions for Testing

### A. Testing the Java CLI Application
Execute the following verification test cases in the Java terminal:

| Test Case ID | Action | Expected Output | Status |
| :--- | :--- | :--- | :--- |
| **TC-01** | Enter choice `1`, input title `Lab 3 Dijkstra`, Course `CSE2006`, Date `2026-10-15`, Subject `Java`, Marks `20`, Platform `V-TOP`. | Task created with auto-increment ID and stored in `ArrayList`. | ✅ PASS |
| **TC-02** | Enter choice `1`, leave title empty. | Throws `InvalidTaskException: Task title cannot be empty!` and reprompts. | ✅ PASS |
| **TC-03** | Enter choice `2`, set weightage to `120%`. | Throws `InvalidTaskException: Weightage must be between 0 and 100%!` | ✅ PASS |
| **TC-04** | Enter choice `5`, mark task ID `1` as completed. | Status updates to `[COMPLETED]` and changes persist to `tasks.txt`. | ✅ PASS |
| **TC-05** | Exit application (choice `8`), reload application. | `FileManager` reads `tasks.txt` and restores all tasks with correct IDs. | ✅ PASS |

### B. Automated Testing Command
Run code validation and compilation checks:
```bash
# Type check and lint
npm run lint

# Production build verification
npm run build
```

---

## 8. Academic Rubric Compliance Checklist

- [x] **Relevance to CSE2006 (Java)**: Built with core Java OOP, Collections, File I/O, and custom Exception Handling.
- [x] **Three Functional Modules**: Task CRUD Management, Academic Analytics, and Gamification Rewards.
- [x] **Four Non-Functional Requirements**: Usability (responsive UI & CLI), Reliability (file persistence), Performance (<50ms response), Error Handling (`try-catch` & validation).
- [x] **5–10 Meaningful Modules/Classes**: `Task`, `Assignment`, `ExamTask`, `TaskManager`, `FileManager`, `InvalidTaskException`, `Main`, `AppNavbar`, `StatsBanner`, `TaskCard`, `RewardsModal`.
- [x] **GitHub Files**: `statement.md` and `README.md` compliant with Sections 5.1 and 5.2.
- [x] **Project Report**: 15-section report ready in `report/PROJECT_REPORT.md`.
