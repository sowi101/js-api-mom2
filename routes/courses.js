var express = require('express');
const fs = require("fs");

var router = express.Router();

const coursesPath = './jsons/courses.json';

/* GET courses */
router.get('/', function (req, res, next) {
  // Method to get all objects from JSON file
  fs.readFile(coursesPath, 'utf8', function (err, data) {
    // Save array to a variable
    let courses = data;
    // Header to indicate in which format response is sent
    res.contentType('application/json');
    // Send response to client
    res.send(courses);
  });
});



/* GET course by id */
router.get('/:id', function (req, res, next) {
  // Save parameter value to a variable
  let id = req.params.id;

  // Method to get one certain object from JSON file 
  fs.readFile(coursesPath, 'utf8', (err, data) => {
    // Converts the string from JSON file to JavaScript objects and save to an array variable
    let courses = JSON.parse(data);
    // Look for a certain object in the courses array and save it to a variable
    let foundCourse = courses.find((courses) => courses._id == id);

    // If statement that checks if an object with a certain id can be found in the array
    if (foundCourse) {
      // Convert the object to JSON string
      let courseObj = JSON.stringify(foundCourse);
      // Header to indicate in which format response is sent
      res.contentType('application/json');
      // Send response to client with object

      res.send(courseObj);
    } else {
      // Send response to client about non-existing object
      res.json({ message: "Angiven kurs finns inte!" })
    }
  });
});


/* DELETE course by id */
router.delete('/:id', function (req, res, next) {
  // Save parameter value to a variable
  let id = req.params.id;

  // Method to delete object from JSON file 
  fs.readFile(coursesPath, 'utf8', (err, data) => {
    // Converts the string from JSON file to JavaScript objects and save to an array variable
    let courses = JSON.parse(data);
    // Look for a certain object in the courses array and save it to a variable
    let foundCourse = courses.find((courses) => courses._id == id);
    // If statement that checks if an object with a certain id can be found in the array
    if (foundCourse) {
      // Save index for object
      let courseIndex = courses.indexOf(foundCourse);
      // Remove object with corresponding index from array
      courses.splice(courseIndex, 1);
      // Convert array of objects to JSON string
      let coursesObjs = JSON.stringify(courses);
      // Method to write new array to JSON file
      fs.writeFile(coursesPath, coursesObjs, function(err, data) {
        if(err) console.log('error', err);
      });
      // Send response to client
      res.json({ message: 'Kurs raderad!'});
    } else {
      // Send response to client about non-existing object
      res.json({ message: 'Angiven kurs finns inte!'})
    }
  });
});

module.exports = router;