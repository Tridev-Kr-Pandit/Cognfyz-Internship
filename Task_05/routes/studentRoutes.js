const express = require('express');
const router = express.Router();

const {allStudentsData, showStudentData,registrationPage, addNewStudent, deleteStudent, updatePage, updateStudent} = require('../controllers/studentController')


router.route('/studentsData').get(allStudentsData);
router.route('/studentData/:id').get(showStudentData);

router.route('/registrationPage').get(registrationPage);
router.route('/addStudent').post(addNewStudent);

router.route('/deleteStudent/:id').get(deleteStudent);

// Update Page
router.route('/updatePage/:id').get(updatePage);
router.route('/updateStudent/:id').post(updateStudent);



module.exports = router;