const roster = [];

function addStudent() {
    let studentDiv = document.getElementById("student");
    roster.push(studentDiv.value);

    let outputDiv = document.getElementById("output");

    let formattedString = "";
    roster.forEach((student, index) => {
        let addedIndex = index + 1;
        formattedString += addedIndex + ". " + student + "\n";
    });

    outputDiv.innerText = formattedString;
    
    return false;
} 

function init() {
    document.getElementById("theForm").onsubmit = addStudent;
} 
window.onload = init;