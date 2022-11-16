"use strict";

// Call of function to get all courses when window is loaded
window.onload = getCourses();

// Function that adds event listener to delete button
function callDeleteMethod() {
    let btnEl = document.querySelectorAll('button');
    btnEl.forEach(e => e.addEventListener("click", function (e) {
        e.preventDefault();
        let id = e.target.id;
        deleteCourse(id);
    }));
}

// Function that prints message after course is deleted
function deleteMessage(text) {
    let message = text;
    let delMessage = document.getElementById("delete-message");
    delMessage.innerHTML = message;
}

// Function with fetch to get all courses
function getCourses() {
    fetch("http://localhost:3000/courses", {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            // Call of printCourses function 
            printCourses(data);
        })
        .catch(err => console.log(err))
}

// Function to print all courses
function printCourses(courses) {
    // Save table element to variable
    const courseTable = document.getElementById('course-table');
    // Empty the table
    courseTable.innerHTML = "";

    // If statement that checks if there are any objects in the array
    if (courses.length > 0) {
        // For each that loops through all objects in the array and prints its information to the screen
        courses.forEach(course => {
            courseTable.innerHTML += `
            <tr id="${course._id}">
                <td class="code">${course.courseId}</td>
                <td class="name">${course.courseName}</td>
                <td class="period">${course.coursePeriod}</td>
                <td class="delete"><button id="${course._id}" type="button">Radera</button></td>
            </tr>      
        `;
        });
    } else {
        // Prints message if
        courseTable.innerHTML = `
            <tr>
                <td>Det finns inga kurser lagrade!</td>
            </tr>
        `
    }

    // Call of function that adds eventlistener to delete button
    callDeleteMethod();
}

// Function with fetch to delete course
function deleteCourse(id) {
    fetch("http://localhost:3000/courses/" + id, { method: 'DELETE' })
        .then(response => response.text())
        .then(text => {
            // Call of function to rerender table
            getCourses();
            // Call of function to print message
            deleteMessage(text);
        })
        .catch(err => console.log(err))
}
