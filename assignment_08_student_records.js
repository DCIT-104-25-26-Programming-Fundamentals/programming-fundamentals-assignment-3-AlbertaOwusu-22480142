// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

let students = [];

function calculateAverage(scores) {
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    return sum / scores.length;
}

function addStudent() {
    let name = readlineSync.question('Student name: ');
    let id = readlineSync.questionInt('Student ID: ');
    let count = readlineSync.questionInt('How many scores? ');

    let scores = [];
    for (let i = 0; i < count; i++) {
        let score = readlineSync.questionInt('Enter score ' + (i + 1) + ': ');
        scores.push(score);
    }

    students.push({ name: name, id: id, scores: scores });
    console.log('Student "' + name + '" added successfully.');
}

function displayStudents() {
    if (students.length === 0) {
        console.log('No students yet.');
        return;
    }
    for (let i = 0; i < students.length; i++) {
        let s = students[i];
        let avg = calculateAverage(s.scores);
        console.log('Name: ' + s.name);
        console.log('ID: ' + s.id);
        console.log('Scores: ' + s.scores.join(', '));
        console.log('Average: ' + avg.toFixed(2));
        console.log('--------------------------------');
    }
}

function findAverageById() {
    let id = readlineSync.questionInt('Enter student ID: ');
    let found = null;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            found = students[i];
            break;
        }
    }
    if (found === null) {
        console.log('Error: Student ID not found.');
        return;
    }
    let avg = calculateAverage(found.scores);
    console.log(found.name + "'s average score: " + avg.toFixed(2));
}

function showMenu() {
    console.log('================================');
    console.log('   STUDENT RECORD SYSTEM MENU');
    console.log('================================');
    console.log('1. Add student');
    console.log('2. Display all students');
    console.log('3. Calculate average score');
    console.log('4. Quit');
}

function main() {
    let running = true;
    while (running) {
        showMenu();
        let choice = readlineSync.questionInt('Enter your choice (1-4): ');

        if (choice === 1) {
            addStudent();
        } else if (choice === 2) {
            displayStudents();
        } else if (choice === 3) {
            findAverageById();
        } else if (choice === 4) {
            console.log('Goodbye!');
            running = false;
        } else {
            console.log('Invalid choice. Please enter 1-4.');
        }
    }
}

main();
