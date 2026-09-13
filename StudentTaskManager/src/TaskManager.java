import java.util.ArrayList;
import java.util.List;

/**
 * TaskManager.java
 * Core business management layer maintaining the list of tasks.
 * 
 * Concepts Demonstrated:
 * - ArrayList Collection: ArrayList<Task>
 * - Runtime Polymorphism: dynamic method dispatch on Task instances (Assignment / ExamTask)
 * - Encapsulation: maintaining list state privately and offering clean service methods
 * - Control structures: enhanced for-loops, if-else logic, formatted output
 * - String manipulation: case-insensitive query matching, length truncation
 * 
 * Course: CSE2006 Programming in Java
 */
public class TaskManager {
    // Encapsulated ArrayList of polymorphic Task references
    private final ArrayList<Task> taskList;

    public TaskManager() {
        this.taskList = new ArrayList<Task>();
    }

    /**
     * Adds a task to the collection.
     */
    public void addTask(Task task) throws InvalidTaskException {
        if (task == null) {
            throw new InvalidTaskException("Cannot add a null task to the manager.");
        }
        this.taskList.add(task);
    }

    /**
     * Returns a copy of the task list to preserve internal encapsulation.
     */
    public ArrayList<Task> getAllTasks() {
        return new ArrayList<Task>(this.taskList);
    }

    /**
     * Returns the current total count of tasks.
     */
    public int getTaskCount() {
        return this.taskList.size();
    }

    /**
     * Finds a task by its unique ID.
     */
    public Task findTaskById(int taskId) {
        for (Task task : this.taskList) {
            if (task.getTaskId() == taskId) {
                return task;
            }
        }
        return null;
    }

    /**
     * Searches tasks by keyword across title, course code, ID, or subclass-specific fields.
     */
    public ArrayList<Task> searchTasks(String query) {
        ArrayList<Task> results = new ArrayList<Task>();
        if (query == null || query.trim().isEmpty()) {
            return results;
        }

        String lowerQuery = query.trim().toLowerCase();

        for (Task task : this.taskList) {
            boolean matched = task.getTitle().toLowerCase().contains(lowerQuery)
                    || task.getCourseCode().toLowerCase().contains(lowerQuery)
                    || String.valueOf(task.getTaskId()).equals(lowerQuery);

            // Check subclass-specific fields if not already matched
            if (!matched && task instanceof Assignment) {
                Assignment assignment = (Assignment) task;
                matched = assignment.getSubject().toLowerCase().contains(lowerQuery)
                        || assignment.getSubmissionPlatform().toLowerCase().contains(lowerQuery);
            } else if (!matched && task instanceof ExamTask) {
                ExamTask exam = (ExamTask) task;
                matched = exam.getExamType().toLowerCase().contains(lowerQuery)
                        || exam.getSyllabusTopics().toLowerCase().contains(lowerQuery);
            }

            if (matched) {
                results.add(task);
            }
        }
        return results;
    }

    /**
     * Marks a task as completed by ID.
     * Returns true if found and updated, false otherwise.
     */
    public boolean markTaskCompleted(int taskId) {
        Task task = findTaskById(taskId);
        if (task != null) {
            task.markCompleted();
            return true;
        }
        return false;
    }

    /**
     * Deletes a task by ID.
     * Returns true if deleted, false if not found.
     */
    public boolean deleteTask(int taskId) {
        for (int i = 0; i < this.taskList.size(); i++) {
            if (this.taskList.get(i).getTaskId() == taskId) {
                this.taskList.remove(i);
                return true;
            }
        }
        return false;
    }

    /**
     * Prints a clean tabular view of all tasks.
     */
    public void displayAllTasks() {
        if (this.taskList.isEmpty()) {
            System.out.println("No tasks found. Your task list is currently empty.");
            return;
        }

        System.out.println("\n----------------------------------------------------------------------------------");
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

    /**
     * Displays comprehensive statistical breakdown of academic tasks.
     */
    public void displayStatistics() {
        int total = this.taskList.size();
        if (total == 0) {
            System.out.println("\n========================================");
            System.out.println("           TASK STATISTICS");
            System.out.println("========================================");
            System.out.println("No tasks recorded yet. Add tasks to see statistics.");
            System.out.println("========================================");
            return;
        }

        int completedCount = 0;
        int assignmentCount = 0;
        int examCount = 0;
        int completedAssignments = 0;
        int completedExams = 0;

        for (Task task : this.taskList) {
            if (task.isCompleted()) {
                completedCount++;
            }
            if (task instanceof Assignment) {
                assignmentCount++;
                if (task.isCompleted()) {
                    completedAssignments++;
                }
            } else if (task instanceof ExamTask) {
                examCount++;
                if (task.isCompleted()) {
                    completedExams++;
                }
            }
        }

        int pendingCount = total - completedCount;
        double completionRate = ((double) completedCount / total) * 100.0;

        System.out.println("\n========================================");
        System.out.println("           TASK STATISTICS");
        System.out.println("========================================");
        System.out.printf("  Total Tasks Recorded    : %d%n", total);
        System.out.printf("  Completed Tasks         : %d%n", completedCount);
        System.out.printf("  Pending Tasks           : %d%n", pendingCount);
        System.out.printf("  Overall Completion Rate : %.1f%%%n", completionRate);
        System.out.println("----------------------------------------");
        System.out.println("  Category Breakdown:");
        System.out.printf("    • Assignments        : %d (Completed: %d, Pending: %d)%n",
                assignmentCount, completedAssignments, (assignmentCount - completedAssignments));
        System.out.printf("    • Exam Milestones    : %d (Completed: %d, Pending: %d)%n",
                examCount, completedExams, (examCount - completedExams));
        System.out.println("========================================");
    }

    /**
     * Replaces the task collection with loaded tasks.
     */
    public void setTasks(List<Task> newTasks) {
        this.taskList.clear();
        if (newTasks != null) {
            this.taskList.addAll(newTasks);
        }
    }
}
