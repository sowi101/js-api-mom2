"use strict";

window.onload = init;

function init() {
    getCourses();
}

// Function that adds event listener to delete button
function callDeleteMethod() {
    let btnEl = document.querySelectorAll('button');
    btnEl.forEach(e => e.addEventListener("click", function (e) {
        let id = e.target.id;
        deleteCourse(id);
    }));
}

function deleteMessage(text) {
    let message = text;
    let delMessage = document.getElementById("delete-message");
    delMessage.innerHTML = message;
}

// Function to fetch all courses
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

    if (courses.length > null) {
        // For each that loops through all objects in the array and prints its information to the screen
        courses.forEach(course => {
            courseTable.innerHTML += `
            <tr id="${course._id}">
                <td class="code">${course.courseId}</td>
                <td class="name">${course.courseName}</td>
                <td class="period">${course.coursePeriod}</td>
                <td class="delete"><button id="${course._id}">Radera</button></td>
            </tr>      
        `;
        });
    } else {
        courseTable.innerHTML = `
            <tr>
                <td>Det finns inga kurser lagrade!</td>
            </tr>
        `
    }

    // Call of function that adds eventlistener to delete button
    callDeleteMethod();
}

// Function to delete course
function deleteCourse(id) {
    fetch("http://localhost:3000/courses/" + id, { method: 'DELETE' })
        .then(response => response.text())
        .then(text => {
            getCourses();
            deleteMessage(text);
        })
        .catch(err => console.log(err))
}
