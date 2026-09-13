# PROJECT REPORT

## Design and Implementation of an Object-Oriented Student Task and Assignment Manager

---

### 1. COVER PAGE

* **Course Code**: CSE2006  
* **Course Title**: Programming in Java  
* **Course Type**: Embedded Lab / Project-Based Learning (LP)  
* **Academic Initiative**: VITyarthi – Build Your Own Project (Flipped Course Evaluation)  
* **Project Title**: Student Task & Assignment Manager (Academic Coursework & Examination Tracker)  
* **Student Name**: Venkatesh Shelke  
* **Email**: venkateshshelke9496@gmail.com  
* **Academic Year**: 2025–2026  
* **Department**: School of Computer Science and Engineering  
* **Institution**: Vellore Institute of Technology (VIT)  

---

### 2. INTRODUCTION
In modern engineering education, undergraduate students face a challenging volume of academic deadlines. A single semester typically requires managing 5 to 7 theory and laboratory subjects simultaneously. Each subject introduces a continuous stream of graded deliverables:
- Programming lab assignments
- Continuous Assessment Tests (CAT-1 and CAT-2)
- Final Assessment Tests (FAT)
- Unannounced quizzes, group project reviews, and online LMS submissions (Moodle, Canvas, V-TOP).

When academic deliverables are tracked informally—such as through scattered notes, sticky pads, or messaging groups—students inevitably face missed deadlines, inadequate exam revision planning, and elevated academic stress.

The **Student Task & Assignment Manager** was designed and implemented as an academic project for **CSE2006 (Programming in Java)**. The system provides a unified, object-oriented solution allowing students to capture, prioritize, track, and complete their coursework and exam milestones. The architecture utilizes core Java SE principles—specifically inheritance, polymorphism, encapsulation, custom exception handling, collections, and character stream file I/O—accompanied by an interactive modern dashboard featuring real-time analytics and positive-reinforcement rewards.

---

### 3. PROBLEM STATEMENT
University students regularly struggle with fragmented task management due to four principal problems:
1. **Dispersed Portals**: Coursework deadlines are posted on different portals (V-TOP, Moodle, Google Classroom), creating information fragmentation.
2. **Category Ambiguity**: Generic todo-list applications fail to distinguish between:
   - **Coursework Deliverables**: Requiring submission platform tracking, subject name, and maximum marks.
   - **Examination Milestones**: Requiring syllabus tracking, duration in minutes, and percentage weightage toward the final semester grade.
3. **Resource Bloat and Connectivity Barriers**: Commercial productivity tools frequently require paid cloud subscriptions, high RAM overhead, and continuous internet connectivity, making them unsuitable for distraction-free offline study environments.
4. **Data Volatility**: Basic script utilities lack persistent storage, causing all entered task records to vanish upon application termination.

**Problem Definition**:  
*To design, architect, and implement an object-oriented software system in Java that models academic deliverables polymorphically, provides persistent flat-file storage, defends against malformed user inputs via custom exception handling, offers intuitive analytics on grade weightage, and motivates consistent study through positive gamified reinforcement.*

---

### 4. FUNCTIONAL REQUIREMENTS
In compliance with the VITyarthi project specification (requiring at least three major functional modules), the application implements the following core modules:

#### Module 1: Academic Task Lifecycle Management (CRUD)
- **FR 1.1**: The system shall allow creation of Coursework Assignments with fields: Title, Course Code, Due Date, Subject Name, Maximum Marks, and Submission Platform (e.g., Moodle, Canvas, V-TOP).
- **FR 1.2**: The system shall allow creation of Examination Milestones with fields: Title, Course Code, Due Date, Exam Type (CAT-1, CAT-2, FAT, Quiz), Syllabus Modules, Duration (minutes), and Grade Weightage Percentage.
- **FR 1.3**: The system shall assign a unique auto-incrementing integer identifier (`taskId`) to each task entity.
- **FR 1.4**: The system shall allow toggling the completion status (`Pending` $\leftrightarrow$ `Completed`) of any task by its unique ID.
- **FR 1.5**: The system shall allow deleting tasks with confirmation safeguards.

#### Module 2: Search, Filter & Inspection Engine
- **FR 2.1**: The system shall support real-time substring searches matching across task Title, Course Code, Subject, Submission Platform, and Syllabus topics.
- **FR 2.2**: The system shall allow category filtering to view "All Tasks", "Only Assignments", or "Only Exams".
- **FR 2.3**: The system shall provide a detailed inspection mode rendering specialized attributes polymorphically (e.g., displaying platform and marks for assignments; syllabus and weightage for exams).

#### Module 3: Academic Analytics & Progress Tracking
- **FR 3.1**: The system shall compute total tasks, completed task count, pending task count, and calculate overall percentage completion.
- **FR 3.2**: The system shall calculate the cumulative semester grade weightage (%) represented by all scheduled exam milestones.
- **FR 3.3**: The system shall automatically evaluate task deadlines against the current date to assign dynamic urgency indicators: `Overdue`, `Due Today`, or `Upcoming`.

#### Module 4: Gamified Rewards & Positive Reinforcement
- **FR 4.1**: Marking an assignment completed shall award the student **+50 Academic XP**.
- **FR 4.2**: Marking an examination milestone completed shall award **+100 Academic XP**.
- **FR 4.3**: The system shall trigger visual celebration effects (particle confetti) and a 4-note audio chime upon task completion.
- **FR 4.4**: The system shall calculate academic levels (Level 1 *Novice Scholar* through Level 5 *Dean's List Legend*) based on accumulated XP.
- **FR 4.5**: The system shall unlock 5 achievement badges based on study milestones.

#### Module 5: Flat-File Persistent Storage (Java I/O)
- **FR 5.1**: All task data shall be automatically saved to `data/tasks.txt` in a deterministic, pipe-delimited format upon exit or creation.
- **FR 5.2**: The system shall parse and restore all existing records into active memory objects upon startup.

---

### 5. NON-FUNCTIONAL REQUIREMENTS
In compliance with Section 2.2 of the project guidelines, the following five non-functional requirements are satisfied:

1. **Performance**:
   - The Java CLI and reactive dashboard shall respond to all user queries (search, filter, status toggles) within 50 milliseconds.
   - File loading and saving operations shall execute in under 100 milliseconds for up to 1,000 tasks.

2. **Usability**:
   - The CLI interface shall present numbered menus and clear validation prompts with zero ambiguous error codes.
   - The web interface shall provide high visual contrast, WCAG AA compliance, intuitive color-coded badges, and one-click actions.

3. **Reliability & Data Persistence**:
   - Task records stored in `data/tasks.txt` shall survive unexpected crashes, browser reloads, or terminal closures.
   - Data parsing routines shall ignore empty trailing lines without corrupting existing records.

4. **Robust Error Handling**:
   - The system shall gracefully intercept non-numeric values, negative numbers, blank strings, and malformed dates using `try-catch` blocks without abnormal program termination.

5. **Resource Efficiency & Maintainability**:
   - The core Java program runs purely on the standard JVM without requiring heavy database server processes.
   - Code is structured cleanly into distinct layers adhering to SOLID design principles.

---

### 6. SYSTEM ARCHITECTURE

```
+-----------------------------------------------------------------------------------------+
|                                    USER INTERFACE                                       |
|  +--------------------------------------------+  +-----------------------------------+  |
|  |     Java Console CLI (Main.java)           |  |    Interactive Web Dashboard      |  |
|  |     Standard I/O (Scanner / stdout)        |  |    (React + Vite + Tailwind CSS)  |  |
|  +--------------------------------------------+  +-----------------------------------+  |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------------+
|                                BUSINESS LOGIC LAYER                                     |
|  +-----------------------------------------------------------------------------------+  |
|  |                             TaskManager.java                                      |  |
|  |  - ArrayList<Task> taskList                                                       |  |
|  |  - addTask(), deleteTask(), toggleTaskStatus(), searchTasks(), getStatistics()    |  |
|  +-----------------------------------------------------------------------------------+  |
|                                          |                                              |
|            +-----------------------------+-----------------------------+                |
|            v                                                           v                |
|  +-----------------------------------------+  +--------------------------------------+  |
|  |           Reward System Engine          |  |       Input Validation Engine        |  |
|  |  - XP calculation & Level Progression   |  |  - Custom InvalidTaskException       |  |
|  |  - Badge Evaluation & Streak Tracking   |  |  - Range & Format Sanitizers         |  |
|  +-----------------------------------------+  +--------------------------------------+  |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------------+
|                              OBJECT-ORIENTED DOMAIN MODEL                               |
|                     +---------------------------------------+                           |
|                     |         Task.java (Abstract)          |                           |
|                     |  - taskId, title, courseCode, dueDate |                           |
|                     |  - isCompleted, static idCounter      |                           |
|                     |  + displayDetails() [Abstract/Virtual]|                           |
|                     |  + toFileString()   [Abstract]        |                           |
|                     +---------------------------------------+                           |
|                                     ^       ^                                           |
|                           extends   |       |   extends                                 |
|                +--------------------+       +--------------------+                      |
|                |                                                 |                      |
|  +----------------------------+                   +----------------------------------+  |
|  |      Assignment.java       |                   |          ExamTask.java           |  |
|  |  - subject                 |                   |  - examType (CAT-1, FAT, etc.)   |  |
|  |  - maxMarks                |                   |  - syllabusTopics                |  |
|  |  - submissionPlatform      |                   |  - durationMinutes               |  |
|  |                            |                   |  - weightagePercent              |  |
|  +----------------------------+                   +----------------------------------+  |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------------+
|                                PERSISTENCE LAYER                                        |
|  +-----------------------------------------------------------------------------------+  |
|  |                             FileManager.java                                      |  |
|  |  - Character Stream Serialization (BufferedReader, BufferedWriter)                |  |
|  |  - Pipe-delimited parsing & atomic file writes                                    |  |
|  +-----------------------------------------------------------------------------------+  |
|                                          |                                              |
|                                          v                                              |
|  +-----------------------------------------------------------------------------------+  |
|  |                       Flat-File Database: data/tasks.txt                          |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

### 7. DESIGN DIAGRAMS

#### 7.1 Use Case Diagram

```
                            +-------------------------------------------+
                            |     Student Task & Assignment Manager     |
                            |                                           |
                            |   +-----------------------------------+   |
                            |   |   Add Coursework Assignment       |   |
                            |   +-----------------------------------+   |
                            |                     ^                     |
                            |                     | <<include>>         |
                            |   +-----------------------------------+   |
                            |   |   Input Validation Checks         |   |
                            |   +-----------------------------------+   |
                            |                     ^                     |
   +-------------------+    |                     | <<include>>         |
   |                   |--->|   +-----------------------------------+   |
   |                   |    |   |   Add Examination Task            |   |
   |                   |    |   +-----------------------------------+   |
   |                   |    |                                           |
   |                   |--->|   +-----------------------------------+   |
   |      Student      |    |   |   View All Tasks (Tabular / Grid) |   |
   |      (Actor)      |--->|   +-----------------------------------+   |
   |                   |    |                                           |
   |                   |--->|   +-----------------------------------+   |
   |                   |    |   |   Search by Title / Course Code   |   |
   |                   |    |   +-----------------------------------+   |
   |                   |    |                                           |
   |                   |--->|   +-----------------------------------+   |
   |                   |    |   |   Toggle Task Completion Status   |   |
   |                   |    |   +-----------------------------------+   |
   |                   |    |                     |                     |
   |                   |    |                     v <<trigger>>         |
   |                   |    |   +-----------------------------------+   |
   |                   |    |   |   Award XP & Fire Celebration     |   |
   |                   |    |   +-----------------------------------+   |
   |                   |    |                                           |
   |                   |--->|   +-----------------------------------+   |
   |                   |    |   |   View Academic Analytics         |   |
   |                   |    |   +-----------------------------------+   |
   |                   |    |                                           |
   |                   |--->|   +-----------------------------------+   |
   |                   |    |   |   Save Tasks to File & Exit       |   |
   +-------------------+    |   +-----------------------------------+   |
                            +-------------------------------------------+
```

---

#### 7.2 Workflow Diagram

```
 [Start]
    |
    v
 Initialize System (Load data/tasks.txt via FileManager)
    |
    v
 Present Menu Options to User
    |
    +---> [1. Add Assignment] ---> Input Fields ---> Validate ---> Success?
    |                                                               |  |
    |                                                     (Yes) <---+  +---> (No: throw InvalidTaskException)
    |                                                       |                      |
    |                                                       v                      v
    |                                                Add to ArrayList       Show Error Message
    |
    +---> [2. Add Exam Task]  ---> Input Fields ---> Validate ---> Success?
    |                                                               |  |
    |                                                     (Yes) <---+  +---> (No: throw InvalidTaskException)
    |                                                       |                      |
    |                                                       v                      v
    |                                                Add to ArrayList       Show Error Message
    |
    +---> [3. View All Tasks] ---> Polymorphic loop over ArrayList ---> Render Table / Cards
    |
    +---> [4. Search Tasks]   ---> Input Keyword ---> Case-insensitive filter ---> Display Results
    |
    +---> [5. Toggle Status]  ---> Provide Task ID ---> Update isCompleted
    |                                                          |
    |                                                          v
    |                                            Award XP + Play Sound + Confetti
    |
    +---> [6. Delete Task]    ---> Provide Task ID ---> Confirm (y/n) ---> Remove from ArrayList
    |
    +---> [7. View Analytics] ---> Compute pending, completed, exam weightage % ---> Display Metrics
    |
    +---> [8. Save & Exit]    ---> Serialize to data/tasks.txt ---> Clean Terminal Exit ---> [End]
```

---

#### 7.3 Sequence Diagram: Adding a Task and Marking It Completed

```
User               Main / UI            TaskManager          FileManager           Task (Entity)
 |                     |                     |                    |                      |
 |--- 1. Enter Task -->|                     |                    |                      |
 |    Details          |--- 2. Validate ---->|                    |                      |
 |                     |       Inputs        |--- 3. Instantiate ----------------------->|
 |                     |                     |       Assignment                          |
 |                     |                     |<-- 4. Return Object ----------------------|
 |                     |                     |--- 5. append to List                      |
 |                     |<-- 6. Task Created -|                    |                      |
 |<-- Confirmation ----|                     |                    |                      |
 |                     |                     |                    |                      |
 |--- 7. Mark Done --->|                     |                    |                      |
 |    (Task ID)        |--- 8. toggle() ---->|                    |                      |
 |                     |                     |--- 9. setCompleted(true) ---------------->|
 |                     |                     |--- 10. saveTasks() |                      |
 |                     |                     |       to File ---->|--- 11. Write File -->|
 |                     |                     |                    |       (tasks.txt)    |
 |                     |<-- 12. Success -----|                    |                      |
 |<-- 13. Fanfare, ----|                                          |                      |
 |    Confetti, +XP    |                                          |                      |
```

---

#### 7.4 Class / Component Diagram

```
+--------------------------------------------------------------------------+
|                             <<abstract>>                                 |
|                                 Task                                     |
+--------------------------------------------------------------------------+
| - taskId: int                                                            |
| - title: String                                                          |
| - courseCode: String                                                     |
| - dueDate: String                                                        |
| - isCompleted: boolean                                                   |
| - idCounter: static int                                                  |
+--------------------------------------------------------------------------+
| + Task(title: String, courseCode: String, dueDate: String)               |
| + Task(taskId: int, title: String, courseCode: String, ...)              |
| + getTaskId(): int                                                       |
| + getTitle(): String                                                     |
| + getCourseCode(): String                                                |
| + getDueDate(): String                                                   |
| + isCompleted(): boolean                                                 |
| + setCompleted(completed: boolean): void                                 |
| + displaySummary(): void                                                 |
| + {abstract} displayDetails(): void                                      |
| + {abstract} toFileString(): String                                      |
+--------------------------------------------------------------------------+
                   ^                                     ^
                   |                                     |
       +-----------+---------+                 +---------+-----------+
       |                     |                 |                     |
+-------------------------------+       +----------------------------------+
|          Assignment           |       |             ExamTask             |
+-------------------------------+       +----------------------------------+
| - subject: String             |       | - examType: String               |
| - maxMarks: double            |       | - syllabusTopics: String         |
| - submissionPlatform: String  |       | - durationMinutes: int           |
+-------------------------------+       | - weightagePercent: double       |
| + getSubject(): String        |       +----------------------------------+
| + getMaxMarks(): double       |       | + getExamType(): String          |
| + getPlatform(): String       |       | + getSyllabus(): String          |
| + displayDetails(): void      |       | + getDuration(): int             |
| + toFileString(): String      |       | + getWeightage(): double         |
+-------------------------------+       | + displayDetails(): void         |
                                        | + toFileString(): String         |
                                        +----------------------------------+
```

---

#### 7.5 Storage Schema / ER Diagram

```
+-----------------------------------------------------------------------------------+
|                            STORAGE ENTITY: tasks.txt                              |
+-----------------------------------------------------------------------------------+
| Attribute Name        | Data Type  | Nullable | Allowed Values / Constraints      |
+-----------------------------------------------------------------------------------+
| RECORD_TYPE           | String     | No       | 'ASSIGNMENT' or 'EXAM'            |
| TASK_ID               | Integer    | No       | Primary Key (Unique, Auto-inc)    |
| TITLE                 | String     | No       | 1 to 100 characters               |
| COURSE_CODE           | String     | No       | Valid Course Identifier (CSE2006) |
| DUE_DATE              | String     | No       | Format: YYYY-MM-DD                |
| IS_COMPLETED          | Boolean    | No       | 'true' or 'false'                 |
| ATTR_1 (Subject/Type) | String     | No       | Subject Name or Exam Type         |
| ATTR_2 (Marks/Syll.)  | String/Num | No       | Max Marks (>0) or Syllabus List   |
| ATTR_3 (Platf./Dur.)  | String/Num | No       | Platform Name or Duration in Mins |
| ATTR_4 (Weightage)    | Double     | Yes      | Grade Weightage (0.0% to 100.0%)  |
+-----------------------------------------------------------------------------------+
```

---

### 8. DESIGN DECISIONS & RATIONALE

1. **Why Java SE Object-Oriented Hierarchy?**
   - *Alternative Considered*: A flat structure using dictionary maps or procedural records.
   - *Decision*: An abstract `Task` superclass with subclasses `Assignment` and `ExamTask`.
   - *Rationale*: Strongly maps to Course Syllabus Unit 2. Demonstrates runtime polymorphism where the collection manager (`ArrayList<Task>`) processes diverse task types uniformly while dispatching specialized detail rendering dynamically.

2. **Why Custom Checked Exception (`InvalidTaskException`)?**
   - *Alternative Considered*: Generic `RuntimeException` or returning boolean error codes.
   - *Decision*: A dedicated `InvalidTaskException extends Exception`.
   - *Rationale*: In accordance with Unit 3 of the syllabus, custom exceptions cleanly separate business constraint validation (e.g., negative marks, empty strings) from generic programmatic runtime crashes.

3. **Why Flat-File Storage with Buffered Character Streams?**
   - *Alternative Considered*: Heavy external SQL daemon (MySQL/Oracle) or transient in-memory arrays.
   - *Decision*: Buffered pipe-delimited text file storage (`data/tasks.txt`).
   - *Rationale*: Fulfills Unit 4 requirements (`BufferedReader`, `BufferedWriter`). Flat-file persistence makes the project 100% portable—evaluators can clone and run it instantly on any system without setting up external database connections or credentials.

4. **Why Dual-Layer (Java Core CLI + Modern Web Dashboard)?**
   - *Decision*: The Java SE code provides the rock-solid, academic, object-oriented foundation required by syllabus evaluation rubrics. The accompanying web dashboard provides modern visualization, real-time analytics, and gamification that elevates project presentation.

---

### 9. IMPLEMENTATION DETAILS

#### 9.1 Course Syllabus Mapping
| Syllabus Unit | Concept Implemented | Implementation Location |
| :--- | :--- | :--- |
| **Unit 1: Flow Control & Basics** | `switch-case`, `while` loop, input parsing | `Main.java` (Menu loop, input validation) |
| **Unit 2: OOP & Polymorphism** | Abstract classes, inheritance, `super()`, method overriding | `Task.java`, `Assignment.java`, `ExamTask.java` |
| **Unit 3: Exception Handling** | Custom checked exceptions, `try-catch-finally`, `throw`, `throws` | `InvalidTaskException.java`, `TaskManager.java` |
| **Unit 4: Collections & I/O Streams** | `ArrayList<Task>`, `BufferedReader`, `BufferedWriter`, character streams | `FileManager.java`, `TaskManager.java` |

#### 9.2 Representative Source Code Snippets

**Custom Exception Validation (`InvalidTaskException.java`):**
```java
public class InvalidTaskException extends Exception {
    public InvalidTaskException(String message) {
        super(message);
    }
}
```

**Polymorphic Base Class (`Task.java`):**
```java
public abstract class Task {
    private static int idCounter = 1;
    protected final int taskId;
    protected String title;
    protected String courseCode;
    protected String dueDate;
    protected boolean isCompleted;

    public Task(String title, String courseCode, String dueDate) throws InvalidTaskException {
        if (title == null || title.trim().isEmpty()) {
            throw new InvalidTaskException("Task title cannot be empty!");
        }
        this.taskId = idCounter++;
        this.title = title.trim();
        this.courseCode = courseCode.trim();
        this.dueDate = dueDate.trim();
        this.isCompleted = false;
    }

    public abstract void displayDetails();
    public abstract String toFileString();
}
```

**Concrete Subclass with Inheritance (`ExamTask.java`):**
```java
public class ExamTask extends Task {
    private String examType;
    private String syllabusTopics;
    private int durationMinutes;
    private double weightagePercent;

    public ExamTask(String title, String courseCode, String dueDate, 
                    String examType, String syllabusTopics, int durationMinutes, 
                    double weightagePercent) throws InvalidTaskException {
        super(title, courseCode, dueDate);
        if (weightagePercent < 0 || weightagePercent > 100) {
            throw new InvalidTaskException("Weightage must be between 0% and 100%!");
        }
        this.examType = examType;
        this.syllabusTopics = syllabusTopics;
        this.durationMinutes = durationMinutes;
        this.weightagePercent = weightagePercent;
    }

    @Override
    public void displayDetails() {
        System.out.println("Exam Type: " + examType + " | Weightage: " + weightagePercent + "%");
        System.out.println("Syllabus Modules: " + syllabusTopics);
    }

    @Override
    public String toFileString() {
        return String.format("EXAM|%d|%s|%s|%s|%b|%s|%s|%d|%.2f",
            taskId, title, courseCode, dueDate, isCompleted, examType, syllabusTopics, durationMinutes, weightagePercent);
    }
}
```

---

### 10. SCREENSHOTS & RESULTS

#### Terminal CLI Execution
```text
======================================================================
           STUDENT TASK & ASSIGNMENT MANAGER (CSE2006)
======================================================================
[1] Add New Assignment
[2] Add New Examination Milestone
[3] View All Academic Tasks
[4] Search Tasks by Keyword
[5] Toggle Task Completion Status
[6] Delete Task Record
[7] Display Academic Analytics
[8] Save & Exit
======================================================================
Enter your choice (1-8): 3

----------------------------------------------------------------------------------------------------
ID   Type         Course     Status       Due Date     Title
----------------------------------------------------------------------------------------------------
#1   Assignment   CSE2006    [COMPLETED]  2026-10-18   Moodle Quiz 2 on Collections
#2   Exam Task    CSE2006    [PENDING]    2026-10-25   Continuous Assessment Test 1 (CAT-1)
#3   Assignment   MAT2001    [PENDING]    2026-10-20   Differential Equations Assignment 1
#4   Exam Task    ECE1002    [COMPLETED]  2026-11-02   Digital Logic Lab Exam
----------------------------------------------------------------------------------------------------
```

#### Academic Analytics Output
```text
======================================================================
                      ACADEMIC SUMMARY & ANALYTICS
======================================================================
Total Registered Deliverables : 4
Completed Tasks               : 2
Pending Tasks                 : 2
Coursework Completion Rate    : 50.0%
Total Exam Grade Weightage    : 35.0% of Semester Grade
Academic XP Earned            : 150 XP (Level 2: Focused Learner)
Active Study Streak           : 2 Tasks in a row
======================================================================
```

---

### 11. TESTING APPROACH

#### 11.1 Test Methodology
A comprehensive testing matrix was executed covering functional black-box testing, boundary value analysis, and exception assertion.

| Test ID | Objective | Input Data | Expected Behavior | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Create valid Assignment | Title: "Lab 4", Code: "CSE2006", Marks: 20 | Task created with auto ID | Task created | **PASS** |
| **TC-02** | Validation: Empty Title | Title: "" (empty string) | Throw `InvalidTaskException` | Exception thrown; friendly message displayed | **PASS** |
| **TC-03** | Validation: Out of range weightage | Weightage: 150.0% | Throw `InvalidTaskException` | Rejects input (>100%) | **PASS** |
| **TC-04** | Toggle status | Task ID: 1 | Status toggled; +XP awarded | Status updated to complete | **PASS** |
| **TC-05** | Keyword search | Query: "CAT-1" | Return Task #2 | Task #2 matched and rendered | **PASS** |
| **TC-06** | File persistence cycle | Save tasks $\rightarrow$ Terminate $\rightarrow$ Reload | All 4 tasks restored with exact IDs | 100% data integrity verified | **PASS** |

---

### 12. CHALLENGES FACED
1. **Handling Scanner Tokenization in CLI**:
   - *Problem*: Mixing `scanner.nextInt()` and `scanner.nextLine()` caused the scanner to consume newline characters, skipping user input prompts.
   - *Resolution*: Implemented a clean wrapper reading entire lines using `scanner.nextLine()` and parsing them using `Integer.parseInt()`.
2. **Deterministic ID Recovery across Sessions**:
   - *Problem*: When reloading tasks from `data/tasks.txt`, the static `idCounter` would reinitialize to 1, causing collision with existing task IDs.
   - *Resolution*: Added an explicit method in `Task.java` (`setLastId(maxId)`) that scans existing IDs during file load and sets the counter to `max(existingIds) + 1`.
3. **Web Audio Synchronization in Browser**:
   - *Problem*: Modern browsers enforce strict autoplay policies blocking Web Audio API context initialization before user gesture.
   - *Resolution*: Handled user-gesture triggers directly upon the task completion checkbox click event with fallback mute toggles.

---

### 13. LEARNINGS & KEY TAKEAWAYS
- **Mastery of OOP Polymorphism**: Gained practical experience designing clean inheritance trees where the client code interacts with abstract classes rather than concrete subclasses.
- **Defensive Exception Architecture**: Understood the critical importance of checked custom exceptions in keeping programs robust under unexpected user input.
- **I/O Streaming Best Practices**: Learned how character streams (`BufferedReader`/`PrintWriter`) ensure platform-independent encoding and fast file access.
- **Full-Cycle Engineering**: Developed a deep appreciation for the link between strong backend domain models and clear, accessible user experiences.

---

### 14. FUTURE ENHANCEMENTS
1. **Direct V-TOP / LMS Sync**: Integrate secure OAuth or automated scraper APIs to import course syllabi and lab schedules directly.
2. **Relational Database Migration (JDBC)**: Add an optional PostgreSQL / MySQL JDBC driver layer for multi-device cloud synchronization.
3. **Calendar Export (.ics)**: Implement an iCalendar generator so students can export academic deadlines directly into Google Calendar or Apple Calendar.

---

### 15. REFERENCES
1. Herbert Schildt, *Java: The Complete Reference*, 11th Edition, Oracle Press / McGraw-Hill Education, 2018.
2. Cay S. Horstmann and Gary Cornell, *Core Java Volume I – Fundamentals*, 10th Edition, Prentice Hall, 2016.
3. Oracle Corporation, *Java Standard Edition API Specification (JDK 17)*, Available: https://docs.oracle.com/en/java/javase/17/
4. VIT Syllabus Document: *CSE2006 – Programming in Java*, School of Computer Science and Engineering, Vellore Institute of Technology.
5. VITyarthi Project Guidelines: *Build Your Own Project – Instructions & Evaluation Rubric*, 2025–2026.
