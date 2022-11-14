window.onload = init;

function init() {
    getCourses();
}

// Function that adds event listener to delete button
function callDeleteMethod() {
    let btnEl = document.querySelectorAll('button');
    btnEl.forEach(e => e.addEventListener("click", function(e) {
        let id = e.target.id;
        deleteCourse(id);
}));
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
    const courseTable = document.getElementById('course-table');
    // Empty the table
    courseTable.innerHTML = "";

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

    // Call of function that adds eventlistener to delete button
    callDeleteMethod();
}

// Function to print information about a course
function deleteCourse(id) {
    fetch("http://localhost:3000/courses/" + id, { method: 'DELETE'})
        .then(response => response.text())
        .then(data => {
            location.reload();
        })
        .catch(err => console.log(err))
}
