import { ProjectFile, TaskRecord } from '../types';

export const PROJECT_FILES: ProjectFile[] = [
  {
    id: 'main-java',
    name: 'Main.java',
    path: 'src/Main.java',
    extension: 'java',
    category: 'src',
    description: 'Console driver & user interaction loop for Student Task Manager',
    content: `import java.util.ArrayList;
import java.util.Scanner;

/**
 * Main.java
 * Entry point for the Student Task & Assignment Manager console application.
 * 
 * Concepts Demonstrated:
 * - Scanner for interactive user input
 * - While loops and switch statements for menu-driven execution
 * - Exception Handling (try-catch-finally, custom InvalidTaskException, NumberFormatException)
 * - Object-Oriented Design and polymorphism
 * - File storage lifecycle (auto-load on startup, save on exit)
 * 
 * Course: CSE2006 Programming in Java
 */
public class Main {
    private static final String STORAGE_PATH = "data/tasks.txt";
    private static final Scanner scanner = new Scanner(System.in);
    private static final TaskManager taskManager = new TaskManager();
    private static final FileManager fileManager = new FileManager(STORAGE_PATH);

    public static void main(String[] args) {
        System.out.println("Initializing Student Task & Assignment Manager...");
        
        // Step 1: Load existing tasks from file storage if available
        ArrayList<Task> initialTasks = fileManager.loadTasks();
        taskManager.setTasks(initialTasks);
        if (!initialTasks.isEmpty()) {
            System.out.printf("[INFO] Successfully loaded %d existing task(s) from %s%n",
                    initialTasks.size(), STORAGE_PATH);
        } else {
            System.out.println("[INFO] Starting with a clean task list (no previous data file found).");
        }

        boolean running = true;

        // Main application loop
        while (running) {
            printMainMenu();
            System.out.print("Enter your choice (1-7): ");
            if (!scanner.hasNextLine()) {
                System.out.println("\\n[INFO] Auto-saving before exit...");
                handleSaveAndExit();
                break;
            }
            String input = readLine();

            switch (input) {
                case "1":
                    handleAddTask();
                    break;
                case "2":
                    handleViewTasks();
                    break;
                case "3":
                    handleSearchTask();
                    break;
                case "4":
                    handleMarkCompleted();
                    break;
                case "5":
                    handleDeleteTask();
                    break;
                case "6":
                    handleShowStatistics();
                    break;
                case "7":
                    handleSaveAndExit();
                    running = false;
                    break;
                default:
                    System.out.println("\\n[ERROR] Invalid choice! Please enter a number between 1 and 7.");
                    pauseForUser();
                    break;
            }
        }

        scanner.close();
    }

    /**
     * Prints the primary terminal menu.
     */
    private static void printMainMenu() {
        System.out.println("\\n========================================");
        System.out.println("       STUDENT TASK MANAGER");
        System.out.println("========================================");
        System.out.println("1. Add Task");
        System.out.println("2. View Tasks");
        System.out.println("3. Search Task");
        System.out.println("4. Mark Task Completed");
        System.out.println("5. Delete Task");
        System.out.println("6. Show Statistics");
        System.out.println("7. Save & Exit");
        System.out.println("========================================");
    }
}`
  },
  {
    id: 'assignment-java',
    name: 'Assignment.java',
    path: 'src/Assignment.java',
    extension: 'java',
    category: 'src',
    description: 'Subclass for academic coursework, labs, and homework tasks',
    content: `/**
 * Assignment.java
 * Subclass representing academic assignments, lab submissions, and homework.
 * 
 * Concepts Demonstrated:
 * - Inheritance: extends Task
 * - super keyword: calling superclass constructors and super.displayDetails()
 * - Constructor Overloading: two constructors for new creation vs persistence restoration
 * - Encapsulation: private fields with validation in getters and setters
 * - Method Overriding: getTaskType(), displayDetails(), toFileString()
 * - String handling: trimming and formatted string generation
 * 
 * Course: CSE2006 Programming in Java
 */
public class Assignment extends Task {
    private String subject;
    private double maxMarks;
    private String submissionPlatform;

    /**
     * Constructor 1: Interactive creation (overloading)
     */
    public Assignment(String title, String courseCode, String dueDate,
                      String subject, double maxMarks, String submissionPlatform) 
                      throws InvalidTaskException {
        super(title, courseCode, dueDate); // Invoke base class constructor
        validateAssignmentData(subject, maxMarks, submissionPlatform);
        this.subject = subject.trim();
        this.maxMarks = maxMarks;
        this.submissionPlatform = submissionPlatform.trim();
    }

    /**
     * Constructor 2: Restoring from storage with specified ID and completion flag (overloading)
     */
    public Assignment(int taskId, String title, String courseCode, String dueDate, boolean isCompleted,
                      String subject, double maxMarks, String submissionPlatform) 
                      throws InvalidTaskException {
        super(taskId, title, courseCode, dueDate, isCompleted); // Invoke base class overloaded constructor
        validateAssignmentData(subject, maxMarks, submissionPlatform);
        this.subject = subject.trim();
        this.maxMarks = maxMarks;
        this.submissionPlatform = submissionPlatform.trim();
    }

    private static void validateAssignmentData(String subject, double maxMarks, String submissionPlatform)
            throws InvalidTaskException {
        if (subject == null || subject.trim().isEmpty()) {
            throw new InvalidTaskException("Subject name cannot be empty.");
        }
        if (maxMarks < 0.0) {
            throw new InvalidTaskException("Maximum marks cannot be negative.");
        }
        if (submissionPlatform == null || submissionPlatform.trim().isEmpty()) {
            throw new InvalidTaskException("Submission platform cannot be empty.");
        }
    }

    // Encapsulated getters and setters
    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) throws InvalidTaskException {
        if (subject == null || subject.trim().isEmpty()) {
            throw new InvalidTaskException("Subject name cannot be empty.");
        }
        this.subject = subject.trim();
    }

    public double getMaxMarks() {
        return this.maxMarks;
    }

    public void setMaxMarks(double maxMarks) throws InvalidTaskException {
        if (maxMarks < 0.0) {
            throw new InvalidTaskException("Maximum marks cannot be negative.");
        }
        this.maxMarks = maxMarks;
    }

    public String getSubmissionPlatform() {
        return this.submissionPlatform;
    }

    public void setSubmissionPlatform(String submissionPlatform) throws InvalidTaskException {
        if (submissionPlatform == null || submissionPlatform.trim().isEmpty()) {
            throw new InvalidTaskException("Submission platform cannot be empty.");
        }
        this.submissionPlatform = submissionPlatform.trim();
    }

    @Override
    public String getTaskType() {
        return "Assignment";
    }

    @Override
    public void displayDetails() {
        super.displayDetails(); // Reuse base class display logic via super keyword
        System.out.printf("  Subject     : %s%n", this.subject);
        System.out.printf("  Max Marks   : %.1f%n", this.maxMarks);
        System.out.printf("  Platform    : %s%n", this.submissionPlatform);
    }

    @Override
    public String toFileString() {
        return String.join("|",
                "ASSIGNMENT",
                String.valueOf(getTaskId()),
                getTitle(),
                getCourseCode(),
                getDueDate(),
                String.valueOf(isCompleted()),
                this.subject,
                String.valueOf(this.maxMarks),
                this.submissionPlatform
        );
    }
}`
  },
  {
    id: 'examtask-java',
    name: 'ExamTask.java',
    path: 'src/ExamTask.java',
    extension: 'java',
    category: 'src',
    description: 'Subclass for CAT examinations, lab FATs, and quizzes',
    content: `/**
 * ExamTask.java
 * Subclass representing exam preparation milestones, quizzes, CATs, and final exams.
 * 
 * Concepts Demonstrated:
 * - Inheritance: extends Task
 * - super keyword: calling superclass constructors and super.displayDetails()
 * - Constructor Overloading: two constructors for new creation vs storage retrieval
 * - Encapsulation: private fields with strict range/content validation
 * - Method Overriding: getTaskType(), displayDetails(), toFileString()
 * 
 * Course: CSE2006 Programming in Java
 */
public class ExamTask extends Task {
    private String examType;           // e.g., CAT-1, CAT-2, Final Exam, Lab FAT, Quiz
    private String syllabusTopics;     // e.g., "OOP, Polymorphism, Exception Handling"
    private int durationMinutes;       // Duration in minutes (e.g., 90, 180)
    private double weightagePercentage;// Exam weightage in total grade (e.g., 30.0%)

    /**
     * Constructor 1: Interactive creation (overloading)
     */
    public ExamTask(String title, String courseCode, String dueDate,
                    String examType, String syllabusTopics, int durationMinutes, double weightagePercentage)
                    throws InvalidTaskException {
        super(title, courseCode, dueDate);
        validateExamData(examType, syllabusTopics, durationMinutes, weightagePercentage);
        this.examType = examType.trim();
        this.syllabusTopics = syllabusTopics.trim();
        this.durationMinutes = durationMinutes;
        this.weightagePercentage = weightagePercentage;
    }

    /**
     * Constructor 2: Storage restoration (overloading)
     */
    public ExamTask(int taskId, String title, String courseCode, String dueDate, boolean isCompleted,
                    String examType, String syllabusTopics, int durationMinutes, double weightagePercentage)
                    throws InvalidTaskException {
        super(taskId, title, courseCode, dueDate, isCompleted);
        validateExamData(examType, syllabusTopics, durationMinutes, weightagePercentage);
        this.examType = examType.trim();
        this.syllabusTopics = syllabusTopics.trim();
        this.durationMinutes = durationMinutes;
        this.weightagePercentage = weightagePercentage;
    }

    private static void validateExamData(String examType, String syllabusTopics,
                                         int durationMinutes, double weightagePercentage)
            throws InvalidTaskException {
        if (examType == null || examType.trim().isEmpty()) {
            throw new InvalidTaskException("Exam type cannot be empty.");
        }
        if (syllabusTopics == null || syllabusTopics.trim().isEmpty()) {
            throw new InvalidTaskException("Syllabus topics cannot be empty.");
        }
        if (durationMinutes <= 0) {
            throw new InvalidTaskException("Exam duration must be greater than 0 minutes.");
        }
        if (weightagePercentage < 0.0 || weightagePercentage > 100.0) {
            throw new InvalidTaskException("Exam weightage must be between 0.0% and 100.0%.");
        }
    }

    public String getExamType() { return this.examType; }
    public String getSyllabusTopics() { return this.syllabusTopics; }
    public int getDurationMinutes() { return this.durationMinutes; }
    public double getWeightagePercentage() { return this.weightagePercentage; }

    @Override
    public String getTaskType() {
        return "Exam Task";
    }

    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.printf("  Exam Type   : %s%n", this.examType);
        System.out.printf("  Syllabus    : %s%n", this.syllabusTopics);
        System.out.printf("  Duration    : %d minutes%n", this.durationMinutes);
        System.out.printf("  Weightage   : %.1f%%%n", this.weightagePercentage);
    }

    @Override
    public String toFileString() {
        return String.join("|",
                "EXAM",
                String.valueOf(getTaskId()),
                getTitle(),
                getCourseCode(),
                getDueDate(),
                String.valueOf(isCompleted()),
                this.examType,
                this.syllabusTopics,
                String.valueOf(this.durationMinutes),
                String.valueOf(this.weightagePercentage)
        );
    }
}`
  },
  {
    id: 'task-java',
    name: 'Task.java',
    path: 'src/Task.java',
    extension: 'java',
    category: 'src',
    description: 'Abstract base class modeling academic tasks with encapsulation and polymorphism',
    content: `/**
 * Task.java
 * Base class representing an academic task or assignment.
 * 
 * Concepts Demonstrated:
 * - Classes and Objects
 * - Encapsulation (private fields, public getters and setters)
 * - Constructor Overloading
 * - this keyword
 * - static members (static idCounter and helper methods)
 * - final members (taskId is immutable)
 * - Method Overriding (displayDetails base logic, toString)
 * 
 * Course: CSE2006 Programming in Java
 */
public abstract class Task {
    private static int idCounter = 1001;
    private final int taskId;
    private String title;
    private String courseCode;
    private String dueDate;
    private boolean isCompleted;

    public Task(String title, String courseCode, String dueDate) throws InvalidTaskException {
        validateBasicInputs(title, courseCode, dueDate);
        this.taskId = idCounter++;
        this.title = title.trim();
        this.courseCode = courseCode.trim().toUpperCase();
        this.dueDate = dueDate.trim();
        this.isCompleted = false;
    }

    public Task(int taskId, String title, String courseCode, String dueDate, boolean isCompleted) 
            throws InvalidTaskException {
        if (taskId <= 0) {
            throw new InvalidTaskException("Task ID must be a positive integer.");
        }
        validateBasicInputs(title, courseCode, dueDate);
        this.taskId = taskId;
        this.title = title.trim();
        this.courseCode = courseCode.trim().toUpperCase();
        this.dueDate = dueDate.trim();
        this.isCompleted = isCompleted;

        if (taskId >= idCounter) {
            idCounter = taskId + 1;
        }
    }

    private static void validateBasicInputs(String title, String courseCode, String dueDate) 
            throws InvalidTaskException {
        if (title == null || title.trim().isEmpty()) {
            throw new InvalidTaskException("Task title cannot be empty or whitespace.");
        }
        if (courseCode == null || courseCode.trim().isEmpty()) {
            throw new InvalidTaskException("Course code cannot be empty or whitespace.");
        }
        if (dueDate == null || dueDate.trim().isEmpty()) {
            throw new InvalidTaskException("Due date cannot be empty or whitespace.");
        }
    }

    public int getTaskId() { return this.taskId; }
    public String getTitle() { return this.title; }
    public String getCourseCode() { return this.courseCode; }
    public String getDueDate() { return this.dueDate; }
    public boolean isCompleted() { return this.isCompleted; }
    public void markCompleted() { this.isCompleted = true; }

    public abstract String getTaskType();
    public abstract String toFileString();

    public void displayDetails() {
        String statusText = this.isCompleted ? "[COMPLETED]" : "[PENDING]";
        System.out.printf("  Task ID     : #%d%n", this.taskId);
        System.out.printf("  Category    : %s%n", getTaskType());
        System.out.printf("  Title       : %s%n", this.title);
        System.out.printf("  Course Code : %s%n", this.courseCode);
        System.out.printf("  Due Date    : %s%n", this.dueDate);
        System.out.printf("  Status      : %s%n", statusText);
    }
}`
  },
  {
    id: 'taskmanager-java',
    name: 'TaskManager.java',
    path: 'src/TaskManager.java',
    extension: 'java',
    category: 'src',
    description: 'In-memory collection manager performing CRUD and statistical analytics',
    content: `import java.util.ArrayList;
import java.util.List;

/**
 * TaskManager.java
 * Core business management layer maintaining the list of tasks.
 * 
 * Concepts Demonstrated:
 * - ArrayList Collection: ArrayList<Task>
 * - Runtime Polymorphism: dynamic method dispatch on Task instances
 * - Encapsulation: maintaining list state privately and offering clean service methods
 * - Control structures: enhanced for-loops, if-else logic, formatted output
 * - String manipulation: case-insensitive query matching
 * 
 * Course: CSE2006 Programming in Java
 */
public class TaskManager {
    private final ArrayList<Task> taskList;

    public TaskManager() {
        this.taskList = new ArrayList<Task>();
    }

    public void addTask(Task task) throws InvalidTaskException {
        if (task == null) {
            throw new InvalidTaskException("Cannot add a null task to the manager.");
        }
        this.taskList.add(task);
    }

    public ArrayList<Task> getAllTasks() {
        return new ArrayList<Task>(this.taskList);
    }

    public Task findTaskById(int taskId) {
        for (Task task : this.taskList) {
            if (task.getTaskId() == taskId) {
                return task;
            }
        }
        return null;
    }

    public boolean markTaskCompleted(int taskId) {
        Task task = findTaskById(taskId);
        if (task != null) {
            task.markCompleted();
            return true;
        }
        return false;
    }

    public boolean deleteTask(int taskId) {
        for (int i = 0; i < this.taskList.size(); i++) {
            if (this.taskList.get(i).getTaskId() == taskId) {
                this.taskList.remove(i);
                return true;
            }
        }
        return false;
    }

    public void displayAllTasks() {
        if (this.taskList.isEmpty()) {
            System.out.println("No tasks found. Your task list is currently empty.");
            return;
        }

        System.out.println("\\n----------------------------------------------------------------------------------");
        System.out.printf("%-6s | %-14s | %-10s | %-24s | %-12s | %-10s%n",
                "ID", "CATEGORY", "COURSE", "TITLE", "DUE DATE", "STATUS");
        System.out.println("----------------------------------------------------------------------------------");

        for (Task task : this.taskList) {
            String status = task.isCompleted() ? "Completed" : "Pending";
            String title = task.getTitle();
            if (title.length() > 24) {
                title = title.substring(0, 21) + "...";
            }
            System.out.printf("#%-5d | %-14s | %-10s | %-24s | %-12s | %-10s%n",
                    task.getTaskId(),
                    task.getTaskType(),
                    task.getCourseCode(),
                    title,
                    task.getDueDate(),
                    status);
        }
        System.out.println("----------------------------------------------------------------------------------");
        System.out.printf("Total: %d task(s)%n", this.taskList.size());
    }
}`
  },
  {
    id: 'filemanager-java',
    name: 'FileManager.java',
    path: 'src/FileManager.java',
    extension: 'java',
    category: 'src',
    description: 'Flat file storage persistence controller for data/tasks.txt',
    content: `import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * FileManager.java
 * Handles persistent file storage operations for saving and loading tasks to/from data/tasks.txt.
 * 
 * Concepts Demonstrated:
 * - File I/O: File, FileReader, FileWriter, BufferedReader, BufferedWriter
 * - Exception Handling: IOException, NumberFormatException, InvalidTaskException
 * - Try-with-resources: automatic resource management closing streams safely
 * - String parsing and delimiter splitting (pipe '|' separator)
 * - Object reconstitution: instantiating appropriate polymorphic subclasses
 * 
 * Course: CSE2006 Programming in Java
 */
public class FileManager {
    private final String filePath;

    public FileManager(String filePath) {
        this.filePath = filePath;
    }

    public ArrayList<Task> loadTasks() {
        ArrayList<Task> loadedTasks = new ArrayList<Task>();
        File file = new File(this.filePath);

        if (!file.exists()) {
            return loadedTasks;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#")) continue;
                try {
                    Task task = parseTaskLine(line);
                    if (task != null) loadedTasks.add(task);
                } catch (InvalidTaskException | NumberFormatException e) {
                    System.err.println("[Warning] Skipping corrupt record: " + e.getMessage());
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading storage file: " + e.getMessage());
        }

        return loadedTasks;
    }

    public boolean saveTasks(List<Task> tasks) {
        File file = new File(this.filePath);
        File parentDir = file.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            parentDir.mkdirs();
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write("# STUDENT TASK & ASSIGNMENT MANAGER STORAGE FILE\\n");
            for (Task task : tasks) {
                writer.write(task.toFileString());
                writer.newLine();
            }
            return true;
        } catch (IOException e) {
            System.err.println("Error writing tasks: " + e.getMessage());
            return false;
        }
    }
}`
  },
  {
    id: 'invalidtaskexception-java',
    name: 'InvalidTaskException.java',
    path: 'src/InvalidTaskException.java',
    extension: 'java',
    category: 'src',
    description: 'Custom checked exception for domain-level task validation',
    content: `/**
 * InvalidTaskException.java
 * Custom exception class for validation errors in Student Task Manager.
 * 
 * Demonstrates:
 * - Custom Exception creation (extending java.lang.Exception)
 * - Constructor chaining via super keyword
 * 
 * Course: CSE2006 Programming in Java
 */
public class InvalidTaskException extends Exception {

    public InvalidTaskException() {
        super("Invalid task data provided.");
    }

    public InvalidTaskException(String message) {
        super(message);
    }

    public InvalidTaskException(String message, Throwable cause) {
        super(message, cause);
    }
}`
  },
  {
    id: 'tasks-txt',
    name: 'tasks.txt',
    path: 'data/tasks.txt',
    extension: 'txt',
    category: 'data',
    description: 'Pipe-delimited persistent flat-file database storage',
    content: `# STUDENT TASK & ASSIGNMENT MANAGER STORAGE FILE
# Format:
# ASSIGNMENT|id|title|courseCode|dueDate|isCompleted|subject|maxMarks|submissionPlatform
# EXAM|id|title|courseCode|dueDate|isCompleted|examType|syllabusTopics|durationMinutes|weightagePercentage
`
  },
  {
    id: 'project-report-md',
    name: 'Project_Report.md',
    path: 'report/Project_Report.md',
    extension: 'md',
    category: 'report',
    description: 'Complete academic documentation for CSE2006 project submission',
    content: `# Academic Project Report: Student Task & Assignment Manager

**Course Code**: CSE2006  
**Course Title**: Programming in Java  
**Project Title**: Student Task & Assignment Manager  
**Application Type**: Console-Based Core Java Application  
**Execution Environment**: Java Standard Edition (Java SE) Terminal  

---

## 1. Title
Design and Implementation of a Console-Based Academic Task and Assignment Manager in Java

## 2. Java Concepts Used
- **Classes & Objects**: Entity modeling across Task, Assignment, ExamTask, TaskManager, FileManager.
- **Encapsulation**: Strict private fields, validated getters/setters.
- **Inheritance**: \`Assignment\` and \`ExamTask\` extend \`Task\`.
- **Polymorphism**: Dynamic method dispatch on \`getTaskType()\`, \`displayDetails()\`, \`toFileString()\`.
- **Custom Exceptions**: \`InvalidTaskException\` intercepts invalid inputs.
- **File I/O**: \`BufferedReader\` / \`BufferedWriter\` with try-with-resources.`
  },
  {
    id: 'readme-md',
    name: 'README.md',
    path: 'README.md',
    extension: 'md',
    category: 'root',
    description: 'Execution instructions, setup guidelines, and project specifications',
    content: `# Student Task & Assignment Manager

> **Course**: CSE2006 – Programming in Java  
> **Application**: Terminal / Command-Line Java Application

## Compilation & Run
\`\`\`bash
# Compile all source files
javac -d out src/*.java

# Run main console application
java -cp out Main
\`\`\`

## Features
- **[1] Add Task**: Create Assignment or Exam Milestone with validated input.
- **[2] View Tasks**: Tabular display of ID, Course, Title, Due Date, Status.
- **[3] Search Task**: Multi-attribute query.
- **[4] Mark Task Completed**: Instant status transition.
- **[5] Delete Task**: Confirmation protected deletion.
- **[6] Show Statistics**: Real-time completion rates and category counts.
- **[7] Save & Exit**: Commits in-memory state to data/tasks.txt.`
  }
];

export const INITIAL_TASKS: TaskRecord[] = [];
