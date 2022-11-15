var express = require('express');

var router = express.Router();

let courses = [
  { "_id": 1, "courseId": "DT162G", "courseName": "Javascript-baserad webbutveckling", "coursePeriod": 1 },
  { "_id": 2, "courseId": "IK060G", "courseName": "Projektledning", "coursePeriod": 1 },
  { "_id": 3, "courseId": "DT071G", "courseName": "Programmering i C#.NET", "coursePeriod": 2 },
  { "_id": 4, "courseId": "DT148G", "courseName": "Webbutveckling för mobila enheter", "coursePeriod": 2 },
  { "_id": 5, "courseId": "DT102G", "courseName": "ASP.NET med C#", "coursePeriod": 3 },
  { "_id": 6, "courseId": "IG021G", "courseName": "Affärsplaner och kommersialisering", "coursePeriod": 3 },
  { "_id": 7, "courseId": "DT069G", "courseName": "Multimedia för webben", "coursePeriod": 4 },
  { "_id": 8, "courseId": "DT080G", "courseName": "Självständigt arbete", "coursePeriod": 4 }
]

/* GET courses */
router.get('/', function (req, res, next) {
  // Convert the array with objects to JSON string
  let coursesObj = JSON.stringify(courses);
  res.contentType('application/json');
  // Send response to client
  res.send(coursesObj);
});



/* GET course by id */
router.get('/:id', function (req, res, next) {
  // Save parameter value to a variable
  let id = req.params.id;
  // Look for a certain object in the courses array and save it to a variable
  let foundCourse = courses.find((courses) => courses._id == id);

  // If statemant that checks if an object with a certain id can be found in the array
  if (foundCourse) {
    // Convert the object to JSON string
    let courseObj = JSON.stringify(foundCourse);
    res.contentType('application/json');
    // Send response to client with object
    res.send(courseObj);
  } else {
    // Send response to client about non-existing object
    res.send("Angiven kurs finns inte!")
  }

});


/* DELETE course by id */
router.delete('/:id', function (req, res, next) {
  // Save parameter value to a variable
  let id = req.params.id;
  // Look for a certain object in the courses array and save it to a variable
  let foundCourse = courses.find((courses) => courses._id == id);

  // If statemant that checks if an object with a certain id can be found in the array
  if (foundCourse) {
    let courseIndex = courses.indexOf(foundCourse);
    courses.splice(courseIndex, 1);
    // Send response to client
    res.send('Kurs raderad!');
  } else {
    // Send response to client about non-existing object
    res.send('Angiven kurs finns inte!')
  }

});



module.exports = router;