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
  let coursesObj = JSON.stringify(courses);
  res.contentType('application/json');
  res.send(coursesObj);
});



/* GET course by id */
router.get('/:id', function (req, res, next) {
  let id = req.params.id;

  let foundCourse = courses.find((courses) => courses._id == id);

  let courseObj = JSON.stringify(foundCourse);
  res.contentType('application/json');
  res.send(courseObj);
});



/* DELETE course by id */
router.delete('/:id', function (req, res, next) {
  let id = req.params.id;
  let foundCourse = courses.find((courses) => courses._id == id);
  let courseIndex = courses.indexOf(foundCourse);
  courses.splice(courseIndex,  1);
  res.send('Kurs raderad!');
});



module.exports = router;