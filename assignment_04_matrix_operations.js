// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(r, c, who) {
    let m = [];
    for (let i = 0; i < r; i++) {
        let line = readlineSync.question('Enter row ' + (i + 1) + who + ': ');
        let row = line.split(' ').map(Number);
        m.push(row);
    }
    return m;
}

function showMatrix(m) {
    for (let i = 0; i < m.length; i++) {
        console.log(m[i].join('  '));
    }
}

function transpose(m) {
    let r = m.length;
    let c = m[0].length;
    let res = [];
    for (let j = 0; j < c; j++) {
        let newRow = [];
        for (let i = 0; i < r; i++) {
            newRow.push(m[i][j]);
        }
        res.push(newRow);
    }
    return res;
}

function addMatrix(a, b) {
    let r = a.length;
    let c = a[0].length;
    let res = [];
    for (let i = 0; i < r; i++) {
        let newRow = [];
        for (let j = 0; j < c; j++) {
            newRow.push(a[i][j] + b[i][j]);
        }
        res.push(newRow);
    }
    return res;
}

function multiplyMatrix(a, b) {
    let r1 = a.length;
    let c1 = a[0].length;
    let c2 = b[0].length;
    let res = [];
    for (let i = 0; i < r1; i++) {
        let newRow = [];
        for (let j = 0; j < c2; j++) {
            let total = 0;
            for (let k = 0; k < c1; k++) {
                total += a[i][k] * b[k][j];
            }
            newRow.push(total);
        }
        res.push(newRow);
    }
    return res;
}

function doTranspose() {
    let r = readlineSync.questionInt('Enter number of rows: ');
    let c = readlineSync.questionInt('Enter number of columns: ');
    let m = readMatrix(r, c, '');

    console.log('\nOriginal Matrix:');
    showMatrix(m);

    console.log('\nTransposed Matrix:');
    showMatrix(transpose(m));
}

function doAddition() {
    let r = readlineSync.questionInt('Enter number of rows: ');
    let c = readlineSync.questionInt('Enter number of columns: ');

    console.log('\nMatrix A:');
    let a = readMatrix(r, c, ' of A');

    console.log('\nMatrix B:');
    let b = readMatrix(r, c, ' of B');

    console.log('\nSum:');
    showMatrix(addMatrix(a, b));
}

function doMultiplication() {
    let r1 = readlineSync.questionInt('Enter rows of A: ');
    let c1 = readlineSync.questionInt('Enter columns of A: ');

    console.log('\nMatrix A:');
    let a = readMatrix(r1, c1, ' of A');

    let r2 = c1;
    let c2 = readlineSync.questionInt('Enter columns of B: ');

    console.log('\nMatrix B:');
    let b = readMatrix(r2, c2, ' of B');

    console.log('\nProduct:');
    showMatrix(multiplyMatrix(a, b));
}

function main() {
    console.log('A - Transpose a Matrix');
    console.log('B - Add Two Matrices');
    console.log('C - Multiply Two Matrices');
    let choice = readlineSync.question('Choose an option (A/B/C): ').toUpperCase();

    if (choice === 'A') {
        doTranspose();
    } else if (choice === 'B') {
        doAddition();
    } else if (choice === 'C') {
        doMultiplication();
    } else {
        console.log('Invalid choice.');
    }
}

main();
