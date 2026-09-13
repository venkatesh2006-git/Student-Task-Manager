# Student Task & Assignment Manager (Java SE Core)

> **Course Code**: CSE2006 – Programming in Java  
> **Course Type**: Embedded Lab / Project-Based Learning (LP)  
> **Evaluation**: VITyarthi - Build Your Own Project  
> **Author**: Venkatesh Shelke  

---

## 1. Project Title
**Student Task & Assignment Manager: An Object-Oriented Java CLI System**

---

## 2. Overview of the Project
This directory contains the standalone Java SE implementation of the **Student Task & Assignment Manager**. Designed strictly to meet all academic and syllabus criteria of **CSE2006 (Programming in Java)**, it implements:
- **Unit 2 (OOP Basics & Polymorphism)**: Encapsulation, Abstract base class (`Task`), Subclasses (`Assignment`, `ExamTask`), Method Overriding (`displayDetails()`, `toFileString()`), and dynamic method dispatch.
- **Unit 3 (Exception Handling)**: Custom exception class (`InvalidTaskException`), defensive checks, `throw` and `throws` declarations, and `try-catch-finally` constructs.
- **Unit 4 (Collections & I/O Streams)**: `java.util.ArrayList`, Character streams with `BufferedReader` and `BufferedWriter`, and persistent flat-file read/write operations in `data/tasks.txt`.

---

## 3. Class Architecture
1. **`Task.java`**: Abstract parent class encapsulating common attributes (`taskId`, `title`, `courseCode`, `dueDate`, `isCompleted`).
2. **`Assignment.java`**: Concrete subclass adding `subject`, `maxMarks`, and `submissionPlatform`.
3. **`ExamTask.java`**: Concrete subclass adding `examType`, `syllabusTopics`, `durationMinutes`, and `weightagePercent`.
4. **`InvalidTaskException.java`**: Custom checked exception for input validation.
5. **`TaskManager.java`**: Manages the `ArrayList<Task>`, search queries, status toggling, and statistical calculations.
6. **`FileManager.java`**: Handles reading from and writing to `data/tasks.txt` with pipe-delimited serialization.
7. **`Main.java`**: Interactive console user interface with menu loop and defensive input parsing.

---

## 4. How to Compile and Run

```bash
# Navigate to source folder
cd src

# Compile all classes
javac *.java

# Execute main program
java Main
```

---

## 5. Storage Specification (`data/tasks.txt`)
Tasks are saved in a clean, human-readable, pipe-delimited format:
```text
ASSIGNMENT|1|Moodle Quiz 2 on Collections|CSE2006|2026-10-18|true|Java OOP|20.0|Moodle
EXAM|2|Continuous Assessment Test 1 (CAT-1)|CSE2006|2026-10-25|false|CAT-1|Units 1, 2 and 3|90|15.0
```
