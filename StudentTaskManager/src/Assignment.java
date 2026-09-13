/**
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
        // Serialization schema:
        // ASSIGNMENT|taskId|title|courseCode|dueDate|isCompleted|subject|maxMarks|submissionPlatform
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
}
