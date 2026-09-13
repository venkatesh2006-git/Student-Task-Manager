/**
 * Task.java
 * Base class representing an academic task or assignment.
 * 
 * Concepts Demonstrated:
 * - Classes and Objects
 * - Encapsulation (private fields, public getters and setters)
 * - Constructor Overloading (default auto-increment constructor vs loaded ID constructor)
 * - this keyword (differentiating instance variables from parameters)
 * - static members (static idCounter and static helper methods)
 * - final members (taskId is immutable once assigned)
 * - Method Overriding (toString, displayDetails base logic)
 * 
 * Course: CSE2006 Programming in Java
 */
public abstract class Task {
    // Static member: shared across all instances to generate sequential unique IDs
    private static int idCounter = 1001;

    // Final member: task ID is immutable once assigned
    private final int taskId;
    
    // Private encapsulated fields
    private String title;
    private String courseCode;
    private String dueDate;
    private boolean isCompleted;

    /**
     * Constructor 1: Used when user creates a new Task interactively.
     * Automatically assigns next unique ID and marks task as pending.
     */
    public Task(String title, String courseCode, String dueDate) throws InvalidTaskException {
        validateBasicInputs(title, courseCode, dueDate);
        this.taskId = idCounter++;
        this.title = title.trim();
        this.courseCode = courseCode.trim().toUpperCase();
        this.dueDate = dueDate.trim();
        this.isCompleted = false;
    }

    /**
     * Constructor 2: Overloaded constructor used when restoring a Task from persistent storage.
     * Accepts existing ID and completion status.
     */
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

        // Ensure future automatically generated IDs don't collide with restored IDs
        if (taskId >= idCounter) {
            idCounter = taskId + 1;
        }
    }

    /**
     * Helper validation method to enforce business rules.
     */
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

    // Static member methods
    public static int getNextId() {
        return idCounter;
    }

    public static void setNextId(int nextId) {
        if (nextId > idCounter) {
            idCounter = nextId;
        }
    }

    // Getters and Setters (Encapsulation)
    public int getTaskId() {
        return this.taskId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) throws InvalidTaskException {
        if (title == null || title.trim().isEmpty()) {
            throw new InvalidTaskException("Task title cannot be empty.");
        }
        this.title = title.trim();
    }

    public String getCourseCode() {
        return this.courseCode;
    }

    public void setCourseCode(String courseCode) throws InvalidTaskException {
        if (courseCode == null || courseCode.trim().isEmpty()) {
            throw new InvalidTaskException("Course code cannot be empty.");
        }
        this.courseCode = courseCode.trim().toUpperCase();
    }

    public String getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(String dueDate) throws InvalidTaskException {
        if (dueDate == null || dueDate.trim().isEmpty()) {
            throw new InvalidTaskException("Due date cannot be empty.");
        }
        this.dueDate = dueDate.trim();
    }

    public boolean isCompleted() {
        return this.isCompleted;
    }

    public void setCompleted(boolean completed) {
        this.isCompleted = completed;
    }

    public void markCompleted() {
        this.isCompleted = true;
    }

    /**
     * Abstract method to be overridden by subclasses.
     * Demonstrates dynamic method dispatch / polymorphism.
     */
    public abstract String getTaskType();

    /**
     * Prints task attributes to the console.
     * Intended to be augmented by subclasses using super.displayDetails().
     */
    public void displayDetails() {
        String statusText = this.isCompleted ? "[COMPLETED]" : "[PENDING]";
        System.out.printf("  Task ID     : #%d%n", this.taskId);
        System.out.printf("  Category    : %s%n", getTaskType());
        System.out.printf("  Title       : %s%n", this.title);
        System.out.printf("  Course Code : %s%n", this.courseCode);
        System.out.printf("  Due Date    : %s%n", this.dueDate);
        System.out.printf("  Status      : %s%n", statusText);
    }

    /**
     * Formats task attributes into a single line string for file storage.
     */
    public abstract String toFileString();

    @Override
    public String toString() {
        return String.format("[%s] #%d: %s (%s) - Due: %s - %s",
                getTaskType(),
                this.taskId,
                this.title,
                this.courseCode,
                this.dueDate,
                this.isCompleted ? "Completed" : "Pending");
    }
}
