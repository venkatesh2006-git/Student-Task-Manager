/**
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

    // Default constructor
    public InvalidTaskException() {
        super("Invalid task data provided.");
    }

    // Constructor accepting custom error message
    public InvalidTaskException(String message) {
        super(message);
    }

    // Constructor accepting message and cause
    public InvalidTaskException(String message, Throwable cause) {
        super(message, cause);
    }
}
