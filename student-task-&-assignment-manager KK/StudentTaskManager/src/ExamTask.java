/**
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

    // Encapsulated getters and setters
    public String getExamType() {
        return this.examType;
    }

    public void setExamType(String examType) throws InvalidTaskException {
        if (examType == null || examType.trim().isEmpty()) {
            throw new InvalidTaskException("Exam type cannot be empty.");
        }
        this.examType = examType.trim();
    }

    public String getSyllabusTopics() {
        return this.syllabusTopics;
    }

    public void setSyllabusTopics(String syllabusTopics) throws InvalidTaskException {
        if (syllabusTopics == null || syllabusTopics.trim().isEmpty()) {
            throw new InvalidTaskException("Syllabus topics cannot be empty.");
        }
        this.syllabusTopics = syllabusTopics.trim();
    }

    public int getDurationMinutes() {
        return this.durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) throws InvalidTaskException {
        if (durationMinutes <= 0) {
            throw new InvalidTaskException("Exam duration must be greater than 0 minutes.");
        }
        this.durationMinutes = durationMinutes;
    }

    public double getWeightagePercentage() {
        return this.weightagePercentage;
    }

    public void setWeightagePercentage(double weightagePercentage) throws InvalidTaskException {
        if (weightagePercentage < 0.0 || weightagePercentage > 100.0) {
            throw new InvalidTaskException("Exam weightage must be between 0.0% and 100.0%.");
        }
        this.weightagePercentage = weightagePercentage;
    }

    @Override
    public String getTaskType() {
        return "Exam Task";
    }

    @Override
    public void displayDetails() {
        super.displayDetails(); // Base details rendered via super call
        System.out.printf("  Exam Type   : %s%n", this.examType);
        System.out.printf("  Syllabus    : %s%n", this.syllabusTopics);
        System.out.printf("  Duration    : %d minutes%n", this.durationMinutes);
        System.out.printf("  Weightage   : %.1f%%%n", this.weightagePercentage);
    }

    @Override
    public String toFileString() {
        // Serialization schema:
        // EXAM|taskId|title|courseCode|dueDate|isCompleted|examType|syllabusTopics|durationMinutes|weightagePercentage
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
}
