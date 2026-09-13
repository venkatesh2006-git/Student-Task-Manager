import java.io.BufferedReader;
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

    /**
     * Loads tasks from the file path.
     * If file does not exist, returns an empty list without crashing.
     */
    public ArrayList<Task> loadTasks() {
        ArrayList<Task> loadedTasks = new ArrayList<Task>();
        File file = new File(this.filePath);

        if (!file.exists()) {
            return loadedTasks; // File does not exist yet; start with empty list
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            int lineNumber = 0;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                line = line.trim();
                // Skip comments and blank lines
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }

                try {
                    Task task = parseTaskLine(line);
                    if (task != null) {
                        loadedTasks.add(task);
                    }
                } catch (InvalidTaskException | NumberFormatException e) {
                    System.err.printf("[Warning] Skipping corrupt record at line %d: %s%n",
                            lineNumber, e.getMessage());
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading storage file: " + e.getMessage());
        }

        return loadedTasks;
    }

    /**
     * Saves all current tasks into data/tasks.txt.
     * Creates parent directory if it does not already exist.
     */
    public boolean saveTasks(List<Task> tasks) {
        File file = new File(this.filePath);
        File parentDir = file.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            parentDir.mkdirs();
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write("# STUDENT TASK & ASSIGNMENT MANAGER STORAGE FILE");
            writer.newLine();
            writer.write("# Format:");
            writer.newLine();
            writer.write("# ASSIGNMENT|id|title|courseCode|dueDate|isCompleted|subject|maxMarks|submissionPlatform");
            writer.newLine();
            writer.write("# EXAM|id|title|courseCode|dueDate|isCompleted|examType|syllabusTopics|durationMinutes|weightagePercentage");
            writer.newLine();

            for (Task task : tasks) {
                writer.write(task.toFileString());
                writer.newLine();
            }
            return true;
        } catch (IOException e) {
            System.err.println("Error writing tasks to storage file: " + e.getMessage());
            return false;
        }
    }

    /**
     * Parses a single serialized line into either an Assignment or ExamTask object.
     */
    private Task parseTaskLine(String line) throws InvalidTaskException {
        // Use split with limit -1 to retain trailing empty fields
        String[] parts = line.split("\\|", -1);
        if (parts.length < 6) {
            throw new InvalidTaskException("Insufficient fields in record: " + line);
        }

        String recordType = parts[0];
        int taskId = Integer.parseInt(parts[1]);
        String title = parts[2];
        String courseCode = parts[3];
        String dueDate = parts[4];
        boolean isCompleted = Boolean.parseBoolean(parts[5]);

        if ("ASSIGNMENT".equalsIgnoreCase(recordType)) {
            if (parts.length < 9) {
                throw new InvalidTaskException("Incomplete Assignment data: " + line);
            }
            String subject = parts[6];
            double maxMarks = Double.parseDouble(parts[7]);
            String platform = parts[8];
            return new Assignment(taskId, title, courseCode, dueDate, isCompleted, subject, maxMarks, platform);

        } else if ("EXAM".equalsIgnoreCase(recordType)) {
            if (parts.length < 10) {
                throw new InvalidTaskException("Incomplete ExamTask data: " + line);
            }
            String examType = parts[6];
            String syllabus = parts[7];
            int duration = Integer.parseInt(parts[8]);
            double weightage = Double.parseDouble(parts[9]);
            return new ExamTask(taskId, title, courseCode, dueDate, isCompleted,
                    examType, syllabus, duration, weightage);
        } else {
            throw new InvalidTaskException("Unknown record type: " + recordType);
        }
    }

    public String getFilePath() {
        return this.filePath;
    }
}
