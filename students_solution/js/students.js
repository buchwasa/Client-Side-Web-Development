let students = [];

class Student {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    getFullName() {
        return (
            this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1) + ", " +
            this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1)
        );
    }
}

function addStudent() {
    'use strict';

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;

    // Reference to where the output goes:
    let output = document.getElementById('output');
    
    // For the output:
    let message = '';

    if (firstName && lastName && email) {
        let student = new Student(firstName, lastName, email);
        // Add the item to the array:
        students.push(student);
        
        // Update the page:
        message = '<h2>Student List</h2><ol>';
        students.forEach(function(item) {
            message += '<li>' + item.getFullName() + '</li>';
        });
        message += '</ol>';
        output.innerHTML = message;      
    } 
    return false;
} 

function init() {
    'use strict';
    document.getElementById('theForm').onsubmit = addStudent;
} 
window.onload = init;