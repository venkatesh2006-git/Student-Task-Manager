import java.util.ArrayList;
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
                System.out.println("\n[INFO] Auto-saving before exit...");
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
                    System.out.println("\n[ERROR] Invalid choice! Please enter a number between 1 and 7.");
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
        System.out.println("\n========================================");
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

    /**
     * Handles adding a new Assignment or ExamTask.
     */
    private static void handleAddTask() {
        System.out.println("\n--- [ Add New Task ] ---");
        System.out.println("Select Task Category:");
        System.out.println("  1. Academic Assignment / Lab Work");
        System.out.println("  2. Exam Task / Assessment Milestone");
        System.out.println("  3. Cancel (Back to Menu)");
        System.out.print("Choose category (1-3): ");
        String choice = readLine();

        if ("3".equals(choice)) {
            System.out.println("[INFO] Task creation cancelled.");
            return;
        }

        if (!"1".equals(choice) && !"2".equals(choice)) {
            System.out.println("[ERROR] Invalid category selection! Returning to menu.");
            pauseForUser();
            return;
        }

        try {
            System.out.print("Enter Task Title: ");
            String title = readLine();

            System.out.print("Enter Course Code (e.g., CSE2006, MAT2001): ");
            String courseCode = readLine();

            System.out.print("Enter Due Date (e.g., 2026-09-15 or DD-MM-YYYY): ");
            String dueDate = readLine();

            if ("1".equals(choice)) {
                // Assignment specific fields
                System.out.print("Enter Subject / Topic: ");
                String subject = readLine();

                System.out.print("Enter Maximum Marks: ");
                String marksStr = readLine();
                double maxMarks;
                try {
                    maxMarks = Double.parseDouble(marksStr);
                } catch (NumberFormatException e) {
                    throw new InvalidTaskException("Maximum marks must be a valid numeric value.");
                }

                System.out.print("Enter Submission Platform (e.g., Moodle, V-TOP, Canvas): ");
                String platform = readLine();

                Assignment assignment = new Assignment(title, courseCode, dueDate, subject, maxMarks, platform);
                taskManager.addTask(assignment);

                System.out.println("\n[SUCCESS] Assignment created successfully!");
                System.out.println("Generated Details:");
                assignment.displayDetails();

            } else {
                // ExamTask specific fields
                System.out.print("Enter Exam Type (e.g., CAT-1, CAT-2, Final Exam, Lab FAT, Quiz): ");
                String examType = readLine();

                System.out.print("Enter Syllabus Topics: ");
                String syllabus = readLine();

                System.out.print("Enter Exam Duration (in minutes): ");
                String durationStr = readLine();
                int duration;
                try {
                    duration = Integer.parseInt(durationStr);
                } catch (NumberFormatException e) {
                    throw new InvalidTaskException("Duration must be a whole number of minutes.");
                }

                System.out.print("Enter Weightage Percentage (e.g., 30 for 30%): ");
                String weightageStr = readLine();
                double weightage;
                try {
                    weightage = Double.parseDouble(weightageStr);
                } catch (NumberFormatException e) {
                    throw new InvalidTaskException("Weightage must be a valid number between 0 and 100.");
                }

                ExamTask examTask = new ExamTask(title, courseCode, dueDate, examType, syllabus, duration, weightage);
                taskManager.addTask(examTask);

                System.out.println("\n[SUCCESS] Exam Task created successfully!");
                System.out.println("Generated Details:");
                examTask.displayDetails();
            }

        } catch (InvalidTaskException e) {
            System.out.printf("%n[ERROR] Task Creation Failed: %s%n", e.getMessage());
        } catch (Exception e) {
            System.out.printf("%n[ERROR] Unexpected error during task input: %s%n", e.getMessage());
        }

        pauseForUser();
    }

    /**
     * Displays all tasks and provides an option to view individual details.
     */
    private static void handleViewTasks() {
        taskManager.displayAllTasks();

        if (taskManager.getTaskCount() == 0) {
            pauseForUser();
            return;
        }

        System.out.print("\nEnter Task ID to view full details (or press Enter to return): ");
        String idInput = readLine();
        if (!idInput.isEmpty()) {
            try {
                int taskId = Integer.parseInt(idInput);
                Task task = taskManager.findTaskById(taskId);
                if (task != null) {
                    System.out.println("\n--- [ Task #" + taskId + " Full Details ] ---");
                    task.displayDetails(); // Dynamic method dispatch
                } else {
                    System.out.printf("[ERROR] No task found with ID #%d.%n", taskId);
                }
            } catch (NumberFormatException e) {
                System.out.println("[ERROR] Invalid ID format. Must be an integer.");
            }
        }
        pauseForUser();
    }

    /**
     * Searches tasks by keyword and shows matches.
     */
    private static void handleSearchTask() {
        System.out.println("\n--- [ Search Tasks ] ---");
        System.out.print("Enter search keyword (Title, Course, Subject, or Syllabus): ");
        String query = readLine();

        if (query.isEmpty()) {
            System.out.println("[ERROR] Search query cannot be empty.");
            pauseForUser();
            return;
        }

        ArrayList<Task> matches = taskManager.searchTasks(query);
        System.out.printf("%nFound %d matching task(s):%n", matches.size());

        if (matches.isEmpty()) {
            System.out.println("No tasks matched your search term.");
        } else {
            System.out.println("----------------------------------------------------------------------------------");
            System.out.printf("%-6s | %-14s | %-10s | %-24s | %-12s | %-10s%n",
                    "ID", "CATEGORY", "COURSE", "TITLE", "DUE DATE", "STATUS");
            System.out.println("----------------------------------------------------------------------------------");
            for (Task task : matches) {
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
                        task.isCompleted() ? "Completed" : "Pending");
            }
            System.out.println("----------------------------------------------------------------------------------");

            System.out.print("\nEnter Task ID to view full details (or press Enter to return): ");
            String idInput = readLine();
            if (!idInput.isEmpty()) {
                try {
                    int taskId = Integer.parseInt(idInput);
                    Task selected = taskManager.findTaskById(taskId);
                    if (selected != null) {
                        System.out.println("\n--- [ Detailed View ] ---");
                        selected.displayDetails();
                    } else {
                        System.out.println("[ERROR] Task ID not found in results.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("[ERROR] Invalid ID format.");
                }
            }
        }

        pauseForUser();
    }

    /**
     * Marks a task as completed.
     */
    private static void handleMarkCompleted() {
        System.out.println("\n--- [ Mark Task Completed ] ---");
        System.out.print("Enter Task ID: ");
        String idStr = readLine();

        try {
            int taskId = Integer.parseInt(idStr);
            Task task = taskManager.findTaskById(taskId);
            if (task == null) {
                System.out.printf("[ERROR] Task with ID #%d does not exist.%n", taskId);
            } else if (task.isCompleted()) {
                System.out.printf("[INFO] Task #%d is already marked as completed!%n", taskId);
            } else {
                task.markCompleted();
                System.out.printf("[SUCCESS] Task #%d (\"%s\") has been marked as Completed!%n",
                        taskId, task.getTitle());
            }
        } catch (NumberFormatException e) {
            System.out.println("[ERROR] Task ID must be a valid integer.");
        }

        pauseForUser();
    }

    /**
     * Deletes a task from the system with user confirmation.
     */
    private static void handleDeleteTask() {
        System.out.println("\n--- [ Delete Task ] ---");
        System.out.print("Enter Task ID to delete: ");
        String idStr = readLine();

        try {
            int taskId = Integer.parseInt(idStr);
            Task task = taskManager.findTaskById(taskId);

            if (task == null) {
                System.out.printf("[ERROR] Task with ID #%d does not exist.%n", taskId);
                pauseForUser();
                return;
            }

            System.out.println("Task to delete:");
            System.out.printf("  #%d: %s [%s] (%s)%n",
                    task.getTaskId(), task.getTitle(), task.getCourseCode(), task.getTaskType());

            System.out.print("Are you sure you want to delete this task? (y/n): ");
            String confirm = readLine().toLowerCase();

            if ("y".equals(confirm) || "yes".equals(confirm)) {
                boolean deleted = taskManager.deleteTask(taskId);
                if (deleted) {
                    System.out.printf("[SUCCESS] Task #%d was successfully deleted.%n", taskId);
                } else {
                    System.out.println("[ERROR] Failed to delete task.");
                }
            } else {
                System.out.println("[INFO] Deletion cancelled by user.");
            }

        } catch (NumberFormatException e) {
            System.out.println("[ERROR] Task ID must be a valid integer.");
        }

        pauseForUser();
    }

    /**
     * Displays summary statistics.
     */
    private static void handleShowStatistics() {
        taskManager.displayStatistics();
        pauseForUser();
    }

    /**
     * Saves all in-memory tasks to data/tasks.txt and terminates gracefully.
     */
    private static void handleSaveAndExit() {
        System.out.println("\nSaving tasks to " + STORAGE_PATH + "...");
        boolean saved = fileManager.saveTasks(taskManager.getAllTasks());
        if (saved) {
            System.out.printf("[SUCCESS] %d task(s) saved to %s successfully.%n",
                    taskManager.getTaskCount(), STORAGE_PATH);
        } else {
            System.err.println("[ERROR] Failed to save tasks to storage file.");
        }
        System.out.println("\nThank you for using Student Task & Assignment Manager.");
        System.out.println("Good luck with your academic semester!");
    }

    /**
     * Safely reads a line of input from Scanner, returning empty string if EOF.
     */
    private static String readLine() {
        if (scanner.hasNextLine()) {
            return scanner.nextLine().trim();
        }
        return "";
    }

    /**
     * Helper to prompt user to press enter before returning to the menu.
     */
    private static void pauseForUser() {
        System.out.print("\nPress Enter to continue...");
        if (scanner.hasNextLine()) {
            scanner.nextLine();
        }
    }
}
